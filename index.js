const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('./db');

app.use(compression());

app.use(bodyParser.json());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/registration', (req, res) => {
    db.hashPassword(req.body.password).then((hash) => {
        db.insertUserInfo(req.body.first, req.body.last, req.body.email, hash);
    }).then( () => {
        res.json(
            { success: true }
        );
    });
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
