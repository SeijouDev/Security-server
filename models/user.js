const pg = require('pg');
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'securitydb',
  password: 'root',
  port: 5432,
});

client.connect().then( ()=> {
    console.log("Connected to pg!");
}).catch( err => {
    console.log("Error on pg connection:");
    console.log(err);
});

let userModel = {

    findAll: (callback) => {
        if(client) {
            client.query('SELECT id, name, email, password FROM users;' , (err, result) => {
                if(err){
                    throw(err);
                }
                else {
                    callback(null, result.rows);
                }
            });
        }
    },

    findOne: (id, callback) => {
        if(client) {
            client.query('SELECT id, name, email, password FROM users WHERE id = $1;' , [id] , (err, result) => {
                if(err){
                    throw(err);
                }
                else {
                    callback(null, result.rows);
                }
            });
        }
    },

    insert: (user, callback) => {
        if(client) {
            client.query("INSERT INTO users (name,email, password) VALUES ($1,$2,$3) RETURNING id;", [user.name, user.email, user.password], (err, result) => {
                if(err) {
                    throw err;
                }
                else {
                    callback(null, { result: result.rows[0].id});
                }
            });
        }
    }
};



module.exports = userModel;