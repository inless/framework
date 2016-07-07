import path from 'path';
import process from 'process';
import cookieSession from 'cookie-session';

var dir = process.cwd();

var configs = require(path.resolve(dir, 'configs', 'server.json'));

export default cookieSession({
	httpOnly: true,
	signed: true,
	name: configs.session.name,
	keys: [configs.session.secret]
});