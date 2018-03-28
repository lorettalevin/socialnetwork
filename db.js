//SERVER SIDE

const spicedPg = require('spiced-pg');
const {dbUser, dbPass} = require('./config/secrets.json');
const db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`);

function insertUserInfo(first, last, email, password) {
    return new Promise((resolve, reject) => {
        const q = `
        INSERT INTO users (first, last, email, hash)
        VALUES ($1, $2, $3, $4)
        RETURNING id`;
        const params = [first, last, email, password];
        db.query(q, params).then(results => {
            resolve(results.rows[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

function checkCredentials(email) {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT hash, id
        FROM users
        WHERE email = $1`;
        const params = [email];
        db.query(q, params).then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

function getUserInfo(id) {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT id, first, last, email, url, bio
        FROM users
        WHERE id = $1`;
        const params = [id];
        db.query(q, params).then(results => {
            resolve(results.rows[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

function updatePic(url, id) {
    return new Promise((resolve, reject) => {
        const q = `
        UPDATE users
        SET url = $1
        WHERE id = $2`;
        const params = [url, id];
        db.query(q, params).then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

function updateBio(bio, id) {
    return new Promise((resolve, reject) => {
        const q = `
        UPDATE users
        SET bio = $1
        WHERE id = $2`;
        const params = [bio, id];
        db.query(q, params).then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

function makeFriend(senderID, recipientID, status) {
    return new Promise((resolve, reject) => {
        const q = `
        INSERT INTO friendships (sender_id, recipient_id, status)
        VALUES ($1, $2, $3)
        RETURNING status`;
        const params = [senderID, recipientID, status];
        db.query(q, params).then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

function getStatus(senderID, recipientID) {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT sender_id, recipient_id, status
        FROM friendships
        WHERE (recipient_id = $1 OR sender_id = $1)
        AND (recipient_id = $2 OR sender_id = $2)`; //can't have 3 params and $1, $2
        const params = [senderID, recipientID];
        db.query(q, params).then(results => {
            resolve(results.rows[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

function updateRequest(status, recipientID, senderID) {
    return new Promise((resolve, reject) => {
        const q = `
        UPDATE friendships
        SET status = $1
        WHERE (recipient_id = $2 OR sender_id = $2)
        AND (recipient_id = $3 OR sender_id = $3)
        RETURNING status`;
        const params =[status, recipientID, senderID];
        db.query(q, params).then(results => {
            resolve(results.rows[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

function getFriends(userID) {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT users.id, first, last, url, status
        FROM friendships
        JOIN users
        ON (status = 1 AND recipient_id = $1 AND sender_id = users.id)
        OR (status = 2 AND recipient_id = $1 AND sender_id = users.id)
        OR (status = 2 AND sender_id = $1 AND recipient_id = users.id)
        `;
        const params = [userID];
        db.query(q, params).then(results => {
            resolve(results.rows);
        }).catch(err => {
            reject(err);
        });
    });
}

function getUsersByIds(arrayOfIds) {
    const query = `
    SELECT id, first, last
    FROM users
    WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
}

function newOnlineUser(id) {
    return new Promise(function(resolve, reject) {
        const q = `
        SELECT id, first, last
        FROM users
        WHERE id = $1
        `;
        const params = [id];
        db.query(q, params).then(results => {
            resolve(results.rows[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    insertUserInfo,
    checkCredentials,
    getUserInfo,
    updatePic,
    updateBio,
    makeFriend,
    getStatus,
    updateRequest,
    getFriends,
    getUsersByIds,
    newOnlineUser
};
