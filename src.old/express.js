import path from 'path';
import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from './session.js';
import router from './router/router.middleware.js';

var dir = process.cwd();

var configs = require(path.resolve(dir, 'configs', 'server.json'));


var app = express();

app.disable('x-powered-by');

configs.compression===false?0:
	app.use(compression({
		level: configs.compression || 9
	}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(multer({
	storage: path.resolve(dir, configs.tmp || 'tmp')
}).any());

app.use(
	express.static(
		path.resolve(dir, 'static')
	)
);

app.use(cookieParser());

app.use(session);

app.use((req, res, next) => {
	if (!req.session) {
		req.session = {};
	}
	if (!req.session.accessLevel) {
		req.session.accessLevel = "any";
	}
	next();
});

// TODO: logger, configs, tmp path, static path, style, rpc, api, router

app.use(express.static('bundles'));
app.use(express.static('static'));

app.use(router);

app.use((req, res)=> {
	res.sendStatus(404).end('Not Found');
});

export default app;
