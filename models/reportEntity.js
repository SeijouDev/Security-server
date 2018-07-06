var pg = require('pg');
var { Client } = require('pg');
var client = new Client({
    connectionString: "postgres://jhkhtqqykdvqau:903cf10387afabb757c8bf42baae3ad3ac6de647dfd721f642e622a18e859fdf@ec2-54-197-233-123.compute-1.amazonaws.com:5432/d1kr6oe2l4lp9f",
    connectionString: "postgres://nelson:1234@localhost:5432/securitydb",
    ssl: true
});


client.connect().then(() => {
    console.log("Connected to pg!");
}).catch(err => {
    console.log("Error on pg connection:");
    console.log(err);
});


let reportModel = {
    insert: (report, callback) => {
        if (client) {
            client.query("INSERT INTO reports( address, latitude, longitude, dates, hours, id_user, states) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;", [report.address, report.latitude, report.longitude, report.dates, report.hours, report.id_user, report.states], (err, result) => {
                if (err)
                    callback(err, null);
                else
                    callback(null, { result: result.rows[0].id });
            });
        }
    }
}

module.exports = reportModel;