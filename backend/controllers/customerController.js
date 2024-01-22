const { Client } = require('pg');
var connectionString = "postgres://postgres:vicenty5@@localhost:5432/test";
const client = new Client({ connectionString: connectionString })
client.connect()


exports.getCustomer = function (req, res) {
    client.query('SELECT * FROM customer', function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })
}

exports.getCustomerFull = function (req, res) {
    console.log(req.params);
    var id = req.params.id
    client.query('SELECT * FROM location WHERE email=$1', [id], function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })
}

exports.create = function (req, res) {
    var cols = [req.body.name, req.body.email, req.body.phone];
    client.query('INSERT INTO customer(name, email, phone) VALUES($1, $2, $3) RETURNING *', cols, function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })
}

exports.update = function (req, res) {
    var cols = [req.body.name, req.body.email, req.body.phone, req.params.id];
    client.query('UPDATE customer SET name=$1, email=$2, phone=$3 WHERE id=$4', cols, function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })
}

exports.delete = function (req, res) {
    var id = req.params.id;
    client.query("DELETE FROM customer WHERE id=$1", [id], function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })
}

exports.regexpQuery = async (req, res, next) => {
    console.log(req.params);
    var name = req.params.name;
    client.query(`SELECT * FROM customer WHERE name LIKE $1 ORDER BY name`, ["%"+name+"%"], function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })
}