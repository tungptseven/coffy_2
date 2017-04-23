/**
 * Created by msi on 08/04/2017.
 */
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
//const promise = require('./pgp');
const nunjucks = require('nunjucks');
const path = require('path');
//const async = require('async');
//const db = promise.db;
const location = require('./app/models/location');

nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app,
    watch: true
});

app.use("/public", express.static(__dirname + "/public"));
app.engine('html', nunjucks.render);
app.set("views", path.resolve(__dirname, "views"));
app.set("views engine", "html");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, function () {
    console.log('Server listening on port 3000!')
});


//GET home page
app.get('/', async(req, res) => {
    let data = await location.getAll();

    res.render('index1.html', data)
});

//GET detail page
app.get('/detail/:id', async(req, res) => {
    let id = req.params.id;

    let data = await location.getDetail(id);
    res.render('detail.html', data)
});

//POST nearest location page
app.post('/find/loc', async(req, res) => {
    let uLong = parseFloat(req.body['inLong']),
        uLat = parseFloat(req.body['inLat']),
        uType = parseFloat(req.body['inType']),
        uR = parseFloat(req.body['inR']);

    let data = await location.getNear(uLat, uLong, uType, uR)
    res.render('index1.html', data)
});


//POST district location page
app.post('/find/dist', async(req, res) => {
    let type = parseFloat(req.body['inType2']),
        district = parseFloat(req.body['inDist']);

    let data = await location.getDist(type,district)
    res.render('index1.html',data)
});


//REST for Mobile
app.post('/find/location', async(req, res) => {
    let uLong = parseFloat(req.body['inLong']),
        uLat = parseFloat(req.body['inLat']),
        uType = parseFloat(req.body['inType']),
        uR = parseFloat(req.body['inR']);

    let data = await location.getNear(uLat, uLong, uType, uR)
    res.json(data)
});

app.post('/find/district', async(req, res) => {
    let type = parseFloat(req.body['inType2']),
        district = parseFloat(req.body['inDist']);

    let data = await location.getDist(type,district)
    res.json(data)
});



