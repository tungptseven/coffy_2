const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, 'config', 'config.json'))[env];
const Promise = require('bluebird');
const monitor = require("pg-monitor");

const cn = {
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.username,
  password: config.password
};

const options = {
  promiseLib: Promise // overriding the default (ES6 Promise);
};
const pgp = require('pg-promise')(options);


// Khi có lỗi phải bật monitor để quan sát câu lệnh SQL
// monitor.attach(options);
// monitor.setTheme('bright');

module.exports.db = pgp(cn);
module.exports.config = config;

// db.none('CREATE TABLE ch10.test (name TEXT)');


// db.query("SELECT name, address, district FROM public.location WHERE ST_DWithin(geog, ST_Point(105.846353,21.014722)::geography, 500) ORDER BY district;");


