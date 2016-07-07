'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loggerClass = require('./logger.class.js');

var _loggerClass2 = _interopRequireDefault(_loggerClass);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dir = _process2.default.cwd();

var console = new _loggerClass2.default('inless.configs');

var Config = function () {
	function Config() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		_classCallCheck(this, Config);

		this.name = name;
		try {
			this._data = require(dir + '/src/configs/' + name + '.json');
		} catch (error) {
			console.error(error.toString());
		}
	}

	_createClass(Config, [{
		key: 'get',
		value: function get() {
			var path = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			var def = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			return path ? _lodash2.default.result(this._data, path, def) : this._data;
		}
	}]);

	return Config;
}();

exports.default = Config;