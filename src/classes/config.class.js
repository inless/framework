import _ from 'lodash';
import Logger from './logger.class.js';
import process from 'process';
let dir = process.cwd();

let console = new Logger('inless.configs');

export default class Config {
	constructor(name = null) {
		this.name = name;
		try {
			this._data = require(`${dir}/src/configs/${name}.json`);
		} catch(error) {
			console.error(error.toString());
		}
	}
	get(path = null, def = null) {
		return path ? _.result(this._data, path, def) : this._data;
	}
}
