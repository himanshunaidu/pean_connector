const express = require('express');
const bodyparser = require('body-parser');
//Following package is to construct paths
const path = require('path');

const pg = require('pg');

console.log(process.cwd());
const PsqlRouters = require('../backend/routes/psql-router.js');

const app = express();

app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
)

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

const Pool = pg.Pool;
const pool = new Pool({
  user: '<USER>',
  host: '<HOST>',
  database: '<DATABASE>',
  password: '<PASSWORD>',
  port: 00000
});

const getData = (request, response, next) => {
  get_query = '<GET DATA COMMAND>';
  pool.query(get_query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
};

const getUsers = (request, response, next) => {
  pool.query('<GET USERS COMMAND>', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

app.use(getData);

//app.use('/api/psql', PsqlRouters);


module.exports = app;
