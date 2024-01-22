const axios = require('axios')
const { Client } = require('pg');
var connectionString = "postgres://postgres:vicenty5@@localhost:5432/test";
const client = new Client({ connectionString: connectionString})
client.connect()

exports.create = function (req, res) {
    var cols = [req.body.email, req.body.customer, req.body.description, req.body.rating, req.body.long, req.body.lat, req.body.title];
    client.query('INSERT INTO location(email, customer, description, rating, long, lat, title) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', cols, function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })

    var colsb = [req.body.customer, req.body.email, req.body.title];
    client.query('INSERT INTO customer(name, email, phone) VALUES($1, $2, $3) RETURNING *', colsb, function (err, result) {
        if (err) {
            console.log(err);
        } else {
          console.log('Cliente adicionado com sucesso');
        }
    })
}

exports.createOne = function (req, res) {
    var cols = [req.body.email, req.body.customer, req.body.description, req.body.rating, req.body.long, req.body.lat, req.body.title];
    client.query('INSERT INTO location(email, customer, description, rating, long, lat, title) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', cols, function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })
}

exports.getCordinate = function (req, res) {
    client.query('SELECT * FROM location', function (err, result) {
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
    var email = req.params.email;
    client.query("DELETE FROM location WHERE email=$1", [email], function (err, result) {
        if (err) {
            res.send({ e: err })
        } else {
            res.send({
                data: result.rows
            })
        }
    })
}


//'AIzaSyDk0XYKGGtuQ7uwCWEFg0p2eWncEQQeMcc'
exports.mapRoutes = async (req, res) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/directions/json?destination=${req.query.destin_cords}&origin=${req.query.origin_cords}&key=${process.env.MAP_API_KEY}`,
        headers: { }
      }
      axios(config)
      .then(function (response) {
        res.send({
            //Location: response.data,
            Location: response.data.routes[0].legs,
            //mapURL: 'https://www.google.com/maps/dir/?api=1&origin= &destination=  +WA&travelmode=bicycling'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
}