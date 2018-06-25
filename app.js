/**
 * Import Modules and other packages
 */

import http from 'http';
import https from 'https';
import express from 'express';
import session from 'express-session';
import pug from 'pug';
import fs from 'fs';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import validator from 'validator';
import helmet from 'helmet';
import purgecss from 'purgecss';
import process from 'process';

import dotenv from 'dotenv';
import config from 'config';

/**
 * Setting and Getting - Variables
 */

const privateKey = fs.readFileSync('./certificates/key.pem','utf-8');
const certificate = fs.readFileSync('./certificates/cert.pem','utf-8');
const credentials = {key: privateKey, cert: certificate};

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
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

/**
 * Setup for http(s) Server
 * 
 * Express within http(s) server
 */
  
var http = http.createServer(app);
var https = https.createServer(credentials, app);

http.listen(8080);
https.listen(8443);