var pg = require('pg');
var { Client } = require('pg');
const client = new Client({
    connectionString: "postgres://jhkhtqqykdvqau:903cf10387afabb757c8bf42baae3ad3ac6de647dfd721f642e622a18e859fdf@ec2-54-197-233-123.compute-1.amazonaws.com:5432/d1kr6oe2l4lp9f",
    ssl: true
    // connectionString: "postgres://nelson:1234@localhost:5432/securitydb",
    // ssl: false
});


client.connect().then(() => {
    console.log("Connected to pg!");
}).catch(err => {
    console.log("Error on pg connection:");
    console.log(err);
});

let reportModel = {

    findAll: (callback) => {
        if (client) {
            client.query('SELECT id, address, latitude, longitude, date, hour, id_user, type, state FROM reports where state=false;', (err, result) => {
                console.log(client)
                if (err) {
                    throw (err);
                }
                else {
                    callback(null, result.rows);
                }
            });
        }
    },

    findOne: (id, callback) => {
        if (client) {
            client.query('SELECT id, address, latitude, longitude, date, hour, id_user, type FROM reports where id= $1;', [id], (err, result) => {
                if (err) {
                    throw (err);
                }
                else {
                    callback(null, result.rows);
                }
            });
        }
    },
    findType: (id, callback) => {
        if (client) {
            client.query('SELECT id, address, latitude, longitude, date, hour, id_user, type FROM reports where type= $1;', [type], (err, result) => {
                if (err) {
                    throw (err);
                }
                else {
                    callback(null, result.rows);
                }
            });
        }
    },
    
    insert: (report, callback) => {
        if (client) {
            client.query("INSERT INTO reports( address, latitude, longitude, date, hour, id_user, state, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;", [report.address, report.latitude, report.longitude, report.dates, report.hours, report.id_user, report.states, report.type], (err, result) => {
                if (err)
                    callback(err, null);
                else
                    callback(null, { result: result.rows[0].id });
            });
        }
    }

}

module.exports = reportModel;