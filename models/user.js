const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'securitydb'
});

let userModel = {

    findAll: (callback) => {
        if(connection) {
            connection.query('SELECT id, name, email, password FROM users;' , (err, rows) => {
                if(err){
                    throw(err);
                }
                else {
                    callback(null, rows);
                }
            });
        }
    },

    findOne: (id, callback) => {
        if(connection) {
            connection.query('SELECT id, name, email, password FROM users WHERE id = ?;' , id , (err, rows) => {
                if(err){
                    throw(err);
                }
                else {
                    callback(null, rows);
                }
            });
        }
    },

    insert: (user, callback) => {
        if(connection) {
            connection.query('INSERT INTO users SET ?', user, (err, result) => {
                if(err) {
                    throw err;
                }
                else {
                    callback(null, { result: result.insertId});
                }
            });

        }
    }
};



module.exports = userModel;