'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getTime = function getTime() {
	return '[' + new Date().toISOString().split('T')[1].slice(0, -1) + ']';
};

var level = 0;

var Logger = function () {
	function Logger() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		var _level = arguments.length <= 1 || arguments[1] === undefined ? level : arguments[1];

		_classCallCheck(this, Logger);

		this.name = name;
		switch (_level) {
			case 'log':
				{
					level = 1;
				}break;
			case 'info':
				{
					level = 2;
				}break;
			case 'warn':
				{
					level = 3;
				}break;
			case 'error':
				{
					level = 4;
				}break;
			case 'debug':
				{
					level = 0;
				}break;
			default:
				{
					level = 0;
				}
		}
	}

	_createClass(Logger, [{
		key: 'log',
		value: function log() {
			var time = getTime(),
			    comment = '-   log:';
			if (level <= 1) {
				var _console;

				(_console = console).log.apply(_console, [_colors2.default.grey(time), _colors2.default.green(comment)].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}, {
		key: 'info',
		value: function info() {
			var time = getTime(),
			    comment = '-  info:';
			if (level <= 2) {
				var _console2;

				(_console2 = console).log.apply(_console2, [_colors2.default.grey(time), _colors2.default.cyan(comment)].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}, {
		key: 'warn',
		value: function warn() {
			var time = getTime(),
			    comment = '-  warn:';
			if (level <= 3) {
				var _console3;

				(_console3 = console).log.apply(_console3, [_colors2.default.grey(time), _colors2.default.orange(comment)].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}, {
		key: 'error',
		value: function error() {
			var time = getTime(),
			    comment = '- error:';
			if (level <= 4) {
				var _console4;

				(_console4 = console).log.apply(_console4, [_colors2.default.grey(time), _colors2.default.red(comment)].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}, {
		key: 'debug',
		value: function debug() {
			var time = getTime(),
			    comment = '- debug:';
			if (level <= 0) {
				var _console5;

				(_console5 = console).log.apply(_console5, [_colors2.default.grey(time), _colors2.default.grey(comment)].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}]);

	return Logger;
}();

exports.default = Logger;