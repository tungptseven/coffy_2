/**
 * Created by msi on 21/04/2017.
 */
const promise = require('../../pgp');
const db = promise.db;
const async = require('async');
const Promise = require('bluebird');

class Locations {
    constructor(){
    }

    getAll() {
        return new Promise(function (resolve, reject) {
            let dt = '';
            db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location ORDER BY random() LIMIT 30")
                .then(data => {
                    async.mapSeries(data, merge2, (err, result) => {
                        dt = {
                            'datas': result
                        };
                        resolve(dt)
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    getDetail(id) {
        return new Promise(function (resolve, reject) {
            db.one("SELECT * FROM coffy.location WHERE id_location = ${id}", {id: id})
                .then(data => {
                    let test = [data];
                    async.map(test, merge2, (err, result) => {
                        let dt = {
                            'data': result[0]
                        };
                        resolve(dt)
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    getNear(lat, long, type, r) {
        return new Promise(function (resolve, reject) {
            db.any(
                "SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "CROSS JOIN (SELECT ST_Point(${Long}, ${Lat})::geography AS ref_geog) As r WHERE ST_DWithin(geog, ref_geog, ${R}) " +
                "AND id_type = ${Type} ORDER BY ST_Distance(geog, ref_geog);",
                {
                    Long: long,
                    Lat: lat,
                    R: r,
                    Type: type
                })
                .then(data => {
                    async.mapSeries(data, merge2, (err, result) => {
                        let dt = {
                            'datas': result
                        };
                        resolve(dt)
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    getDist(type, district) {
        return new Promise(function (resolve, reject) {
            db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "WHERE id_type = ${Type} AND id_district = ${District};",
                {
                    Type: type,
                    District: district
                })
                .then(data => {
                    async.mapSeries(data, merge2, (err, result) => {
                        let dt = {
                            'datas': result
                        };
                        resolve(dt)
                    })
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    restLoc(lat, long, type, r){
        return new Promise(function (resolve, reject) {
            db.any(
                "SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "CROSS JOIN (SELECT ST_Point(${Long}, ${Lat})::geography AS ref_geog) As r WHERE ST_DWithin(geog, ref_geog, ${R}) " +
                "AND id_type = ${Type} ORDER BY ST_Distance(geog, ref_geog);",
                {
                    Long: long,
                    Lat: lat,
                    R: r,
                    Type: type
                })
                .then(data => {
                    async.mapSeries(data, merge2, (err, result) => {
                        let dt = {
                            'datas': result
                        };
                        resolve(dt)
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    restDist(type, district){
        return new Promise(function (resolve, reject) {
            db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "WHERE id_type = ${Type} AND id_district = ${District};",
                {
                    Type: type,
                    District: district
                })
                .then(data => {
                    async.mapSeries(data, merge2, (err, result) => {
                        let dt = {
                            'datas': result
                        };
                        resolve(dt)
                    })
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

let merge2 = (item, cb) => {
    let id_location = item['id_location'];
    let id_type = item['id_type'];
    let id_district = item['id_district'];
    db.one("select name from coffy.district where id_district=${id_district}", {
        id_district: id_district
    })
        .then((result) => {
            item['district'] = result['name'];
            db.one("select name from coffy.type where id_type=${id_type}", {
                id_type: id_type
            })
                .then((result) => {
                    item['type'] = result['name'];
                    db.one("select name from coffy.image where id_location=${id_location}", {
                        id_location: id_location
                    })
                        .then((result) => {
                            let imgPath = '/public/coffy_img/' + result['name'];
                            item['image'] = imgPath;
                            cb(null, item);
                        });
                    // console.log(item);
                })
                .catch((err) => {
                    cb(err, null);
                });
        })
        .catch((err) => {
            cb(err, null);
        });
}

module.exports = new Locations()