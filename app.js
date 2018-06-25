/**
 * Import Modules and other packages
 */

const http = require('http');
// const https = require('https');
const express = require('express');
const session = require('express-session');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('validator');
const helmet = require('helmet');
const purgecss = require('purgecss');
const process = require('process');

const dotenv = require('dotenv');
const config = require('config');

/**
 * Setting and Getting - Variables
 */

/*
 const privateKey = fs.readFileSync('./certificates/key.pem','utf-8');
const certificate = fs.readFileSync('./certificates/cert.pem','utf-8');
const credentials = {key: privateKey, cert: certificate};
*/

// var hostConfig = config.get('data.hosting');
var environmentFile = dotenv.config();

// Removal of CSS files

const removeCSS = new purgecss({
    content: ['./views/*.pug'],
    css: ['./src/styles/*.css']
});

/**
 * Routing with Express
 * 
 * Setup and Configuration
 */

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.get("/", function(req, res){
    res.render("index",{
        title: "Home"
    });
});

/**
 * Error handler
 */

// 404 - handler
app.use(function(req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    next(err);

});

// Simple Error handler
app.use(function(err, req, res, next) {
    
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === require('development' ? err : {});

    res.status(err.status || 500);
    res.render('error');
});

/**
 * Setup for http(s) Server
 * 
 * Express within http(s) server
 */
  
var server = http.createServer(app);
// var serverSecure = https.createServer(credentials, app);

server.listen(3000);
// serverSecure.listen(8443);