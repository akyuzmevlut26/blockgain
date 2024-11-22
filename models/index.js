const mysql = require('mysql');

let db;

const initDB = () => {
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1q2w3e4r5t',
        database: 'blockgain'
    });

    db.connect(function (error) {
        if (error) {
            throw error;
        }
    });
}

const getDB = () => {
    return db;
}

module.exports = { initDB, getDB }