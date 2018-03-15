const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('./db');
const csrf = require('csurf');
const cookieSession = require("cookie-session");
const bcrypt = require('bcryptjs');

app.use(express.static(__dirname + "/public"));

app.use(compression());

app.use(bodyParser.json());

if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({target: 'http://localhost:8081/'}));
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(cookieSession({
    secret: "a really hard to guess secret",
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(csrf());

app.use(function(req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
}

function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

app.post('/registration', (req, res) => {
    if (!req.body.first || !req.body.last || !req.body.email || !req.body.password) {
        res.json({success: false, errorMessage: "Please fill out ALL fields"});
    } else {
        hashPassword(req.body.password).then(hash => {
            db.insertUserInfo(req.body.first, req.body.last, req.body.email, hash).then(results => {
                res.json({success: true});
            }).catch(err => {
                console.log(err);
                res.json({success: false, errorMessage: "Email already exists"});
            });
        });
    }
});

app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, errorMessage: "Please fill out ALL fields"});
    } else {
        db.checkCredentials(req.body.email).then(results => {
            checkPassword(req.body.password, results.rows[0].hash).then(doesMatch => {
                if (doesMatch) {
                    res.json({success: true});
                } else {
                    res.json({success: false, errorMessage: "Invalid password"});
                }
            }).catch(err => {
                console.log(err);
                res.json({success: false, errorMessage: "Invalid password"});
            });
        }).catch(err => {
            console.log(err);
            res.json({success: false, errorMessage: "Invalid email!"});
        });
    }
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
