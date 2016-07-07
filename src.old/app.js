import http from 'http';
import path from 'path';
import process from 'process';
import express from './express.js';
import socketio from './socketio.js';
import gulp from './builder/gulp.js';

var dir = process.cwd();

var configs = require(path.resolve(dir, 'configs', 'server.json'));

var mode = 'development';

var port = configs.mods[mode].port || 8080;
var host = configs.mods[mode].host || 'localhost';


let server = require('http').Server(express);

socketio(server);

gulp();

server.listen(
	port,
	host,
	()=> {
		console.log(`server started on ${host}:${port} in ${mode} mode`);
	}
);
