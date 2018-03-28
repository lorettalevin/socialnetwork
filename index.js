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
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });
// const io = require('socket.io')(server);

app.use(express.static(__dirname + "/public"));

app.use(compression());

app.use(bodyParser.json());

if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({target: 'http://localhost:8081/'}));
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

const cookieSessionMiddleware = cookieSession({
    secret: 'a very secretive secret',
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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



// STARTING SOCKET.IO

let onlineUsers = [], messages = [{
    id: 1,
    message: "Cute Bosnians"
}];

const getOnlineUsers = () => {
    let ids = onlineUsers.map(user => user.userId); //map returns a new array & iterates over each item in an array like the forEach (except forEach doesn't return a new array)

    ids = ids.filter((id, i) => ids.indexOf(id) == i); //filter iterates thru each item of an array just like map does.
    return db.getUsersByIds(ids);
};

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session || !socket.request.session.id) {
        return socket.disconnect(true);
    }

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
        onlineUsers = onlineUsers.filter(user => {
            return user.userId != userId;
        });
        socket.broadcast.emit('userLeft', userId); //emit always takes 2 arguments
    });

    const userId = socket.request.session.id;

    onlineUsers.push({
        userId,
        socketId: socket.id
    });

    getOnlineUsers().then(results => {
        socket.emit('onlineUsers', results.rows);
    });

    db.newOnlineUser(userId).then(results => {
        socket.broadcast.emit('userJoined', results);
    });

    socket.emit('chats', messages);
});

// END OF SOCKET.IO



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
            url: results.url,
            bio: results.bio
        });
    }).catch(err => {
        console.log("there was an error in /user", err);
    });
});

app.get('/get-user/:id', (req, res) => {
    if (req.session.id == req.params.id) {
        res.json({ success: false });
    } else {
        Promise.all([
            db.getUserInfo(req.params.id),
            db.getStatus(req.session.id, req.params.id)
        ]).then(([otherUserInfo, friendshipInfo]) => {
            if (otherUserInfo.url) {
                otherUserInfo.url = s3Url + otherUserInfo.url;
            }
            res.json({
                id: otherUserInfo.id,
                first: otherUserInfo.first,
                last: otherUserInfo.last,
                email: otherUserInfo.email,
                url: otherUserInfo.url,
                bio: otherUserInfo.bio,
                sender_id: (friendshipInfo && friendshipInfo.sender_id) || null,
                recipient_id: (friendshipInfo && friendshipInfo.recipient_id) || null,
                status: (friendshipInfo && friendshipInfo.status) || 0
            });
        }).catch(err => {
            console.log("error in getUser", err);
        });
    }
});

app.post('/profilepicupload', uploader.single('file'), s3.upload, (req, res) => {
    db.updatePic(req.file.filename, req.session.id).then(() => {
        const url = s3Url + req.file.filename;
        res.json({success: true, url});
    });
});

app.post('/bio', (req, res) => {
    db.updateBio(req.body.bio, req.session.id).then(() => {
        res.json({successs: true, bio: req.body.bio});
    });
});

app.post(`/sendfriendrequest/:recipient_id`, (req, res) => {
    if (req.body.status == 0) {
        db.makeFriend(req.session.id, req.params.recipient_id, 1).then(results => {
            res.json({
                success: true,
                status: results.rows[0].status
            });
        });
    } else {
        db.updateRequest(1, req.params.recipient_id, req.session.id).then(results => {
            res.json({
                success: true,
                status: results.status
            });
        });
    }
});

app.post(`/cancelfriendrequest/:recipient_id`, (req, res) => {
    db.updateRequest(5, req.params.recipient_id, req.session.id).then(results => {
        res.json({
            success: true,
            status: results.status
        });
    });
});

app.post(`/acceptfriendrequest/:recipient_id`, (req, res) => {
    db.updateRequest(2, req.params.recipient_id, req.session.id).then(results => {
        res.json({
            success: true,
            status: results.status
        });
    });
});

app.post(`/terminatefriendship/:recipient_id`, (req, res) => {
    db.updateRequest(4, req.params.recipient_id, req.session.id).then(results => {
        res.json({
            success: true,
            status: results.status,
            recipient_id: results.recipient_id
        });
    });
});

app.get('/getfriends', (req, res) => {
    db.getFriends(req.session.id).then(results => {
        if (results.url) {
            results.url = s3Url + results.url;
        }
        res.json({
            success: true,
            friends: results
        });
    });
});





//DON'T TOUCH THIS SECTION!

app.get('/welcome', (req, res) => {
    if (req.session.id) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/', (req, res) => {
    if (!req.session.id) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('*', function(req, res) {   //catch all route --> you can tell by the star
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, () => {
    console.log("I'm listening.");
});
