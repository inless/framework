
import colors from 'colors';

let getTime = ()=> {
	return `[${(new Date).toISOString().split('T')[1].slice(0,-1)}]`;
}

let level = 0;

export default class Logger {
	constructor(name = null, _level = level) {
		this.name = name;
		switch(_level) {
			case 'log': {
				level = 1;
			} break;
			case 'info': {
				level = 2;
			} break;
			case 'warn': {
				level = 3;
			} break;
			case 'error': {
				level = 4;
			} break;
			case 'debug': {
				level = 0;
			} break;
			default: {
				level = 0;
			}
		}
	}
	log() {
		let time = getTime(), comment = '-   log:';
		if(level <= 1) {
			console.log(colors.grey(time), colors.green(comment), ...arguments);
		}
	}
	info() {
		let time = getTime(), comment = '-  info:';
		if(level <= 2) {
			console.log(colors.grey(time), colors.cyan(comment), ...arguments);
		}
	}
	warn() {
		let time = getTime(), comment = '-  warn:';
		if(level <= 3) {
			console.log(colors.grey(time), colors.orange(comment), ...arguments);
		}
	}
	error() {
		let time = getTime(), comment = '- error:';
		if(level <= 4) {
			console.log(colors.grey(time), colors.red(comment), ...arguments);
		}
	}
	debug() {
		let time = getTime(), comment = '- debug:';
		if(level <= 0) {
			console.log(colors.grey(time), colors.grey(comment), ...arguments);
		}
	}
}


