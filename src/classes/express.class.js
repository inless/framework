import Config from './config.class.js';
import Logger from './logger.class.js';

import colors from 'colors';
import _ from 'lodash';
import path from 'path';
import process from 'process';

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

let console = new Logger('express');

let tmp_secret = new Array(10).fill(null).reduce((a,b)=> `${a||''}${(Math.random()*1e8|0).toString(32)}`);

export default class Express {
	constructor() {
		let dir = process.cwd();
		let config = new Config('server');
		this.session = cookieSession({
			httpOnly: true,
			signed: true,
			name: config.get('session.name', 'sid'),
			keys: [config.get('session.secret', tmp_secret)]
		});
		let app = express();
		app.set('x-powered-by', 'inless');
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: true
		}));
		app.use(multer({
			storage: path.resolve(dir, config.get('tempDir', './tmp'))
		}).any());
		app.use(cookieParser());
		app.use(this.session);
		app.use((req, res, next) => {
			if (!req.session) {
				req.session = {
					account: {
						title: 'anonymous',
						level: 'any',
						id: null
					}
				};
			}
			next();
		});
		app.use((req, res, next)=> {
			console.info(`[${colors.grey(_.result(req, 'session.account.title', 'anonymous'))}] ${colors.cyan(req.url)}`);
			next();
		});
		app.use(
			express.static(
				path.resolve(dir, 'static/bundles')
			)
		);
		app.use(
			express.static(
				path.resolve(dir, 'static/build')
			)
		);
		app.use(
			express.static(
				path.resolve(dir, 'static/public')
			)
		);
		this.app = app;
	}
	setMiddleware(middleware = null) {
		if(middleware) {
			this.app.use(middleware);
		}
	}
	getEngine() {
		return this.app;
	}
}
