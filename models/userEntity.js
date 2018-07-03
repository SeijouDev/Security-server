const pg = require('pg');
const { Client } = require('pg');

const client = new Client({
    connectionString: "postgres://jhkhtqqykdvqau:903cf10387afabb757c8bf42baae3ad3ac6de647dfd721f642e622a18e859fdf@ec2-54-197-233-123.compute-1.amazonaws.com:5432/d1kr6oe2l4lp9f",
    ssl: true
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
                if(err) {
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
                if(err)
                    callback(err, null);                
                else
                    callback(null, { result: result.rows[0].id});                
            });
        }
    },

    login: (user, callback) => {
        if(client) {
            client.query('SELECT id, name, email, password FROM users WHERE email = $1 AND password = $2;' , [user.email, user.password] , (err, result) => {
                if(err)
                    callback(err, null);
                else 
                    callback(null, result.rows);                
            });
        }
    }
};



module.exports = userModel;