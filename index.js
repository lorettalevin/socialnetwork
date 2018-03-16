//SERVER SIDE

const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('./db');
const csrf = require('csurf');
const cookieSession = require("cookie-session");
const bcrypt = require('bcryptjs');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./config/s3.js');
const {s3Url} = require("./config/config.json");

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

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.post('/profilepicupload', uploader.single('file'), s3.upload, (req, res) => {
    db.updatePic(req.file.filename, req.session.id).then(() => {
        const url = s3Url + req.file.filename;
        res.json({
            success: true,
            url
        });
    });
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
                req.session = {
                    id: results.id
                };
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
                    req.session = {
                        id: results.rows[0].id
                    };
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


app.get('/user', (req, res) => {
    db.getUserInfo(req.session.id).then(results => {
        if (results.url) {
            results.url = s3Url + results.url;
        }
        res.json({
            id: results.id,
            first: results.first,
            last: results.last,
            email: results.email,
            url: results.url
        });
    });
});

app.get('*', function(req, res) {       //catch all route --> you can tell by the star
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
