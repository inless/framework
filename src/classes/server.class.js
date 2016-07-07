import colors from 'colors';
import http from 'http';
import path from 'path';
import process from 'process';
import Logger from './logger.class.js';

let console = new Logger('inless.server');

export default class Server {
	constructor(express = null) {
		this.server = http.Server(express);
	}
	start(host = '0.0.0.0', port = 80) {
		try {
			this.server.listen(
				port, host,
				()=> {
					console.log(colors.bold(`Server started on ${host}:${port}`));
				}
			);
		} catch(error) {
			console.error(error.toString());
		}
	}
}
