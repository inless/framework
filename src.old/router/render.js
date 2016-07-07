import {minify} from 'html-minifier';

export default (layout, params, isminify = false)=> {
	var escapeHtml = (text)=> {
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return text.replace(/[&<>"']/g, (m)=> { return map[m]; });
	}
	for(var _i in params) {
		var i = params[_i];
		layout = layout.split("%"+_i+"%").join(i);
		layout = layout.split("#"+_i+"#").join(escapeHtml(i));
	}
	return isminify ? minify(layout) : layout;
};
