import colors from 'colors';
import Config from './config.class.js';
import Logger from './logger.class.js';
import Server from './server.class.js';
import Express from './express.class.js';
import Router from './router.class.js';

export default class Starter {
	constructor() {
		let config = new Config('server');
		let console = new Logger('inless', config.get('logLevel'));
		let rotuer = new Router();
		let express = new Express();
		express.setMiddleware(router.getMiddleware());
		let server = new Server(express.getEngine());
		server.start(config.get(`host`), config.get(`port`));
		console.log(colors.bold(`inless started.`));
	}
}