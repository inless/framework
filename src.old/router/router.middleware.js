import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, Route } from 'react-router';
import {getParams} from 'react-router/lib/PatternUtils.js';
import Routes from './routes.js';
import render from './render.js';

import ME from './mexecuter.class.js';

import path from 'path';
import process from 'process';

var dir = process.cwd();

let layout = require(path.resolve(dir, 'layout', 'handler.js')).default;
let middleware = require(path.resolve(dir, 'layout', 'middleware.js')).default;
const template = fs.readFileSync(path.resolve(dir, 'layout', 'template.html')).toString();

var router = express.Router();

var singletone = require('../singletone.js');

var mixins = [
	{
		getState(name) {
			let ret;
			if(!this.state) {
				ret = null;
			} else {
				switch(typeof this.state[name]) {
					case "undefined": ret = null; break;
					default: ret = this.state[name];
				}
			}
			return ret;
		},
		getInitialState() {
			return this.props.location[preData];
		}
	}
];

var routes = (
	<Route path="/" component={React.createClass((layout.mixins = mixins)&&layout)} middleware={middleware}>
		{Routes(mixins).map((route, i)=> <Route
			path={route.path}
			component={route.component}
			key={i}
			middleware={require(`inless_dependencies/${route.id}/middleware.js`).default}
		/>)}
	</Route>
);


var mwr = singletone['ME'] ? singletone['ME'] : singletone['ME'] = new ME(routes);

var preData = Symbol('preData');

router.use((req, res, next)=> {
	let renderProps;
	mwr.test(req.url).then((data)=> {
		renderProps = data;
		return mwr.middlewares(req, renderProps);
	}).then((data)=> {
		if(data.redirect) {
			res.redirect(302, data.redirect);
		} else {
			renderProps.location[preData] = data.store;
			var xContent = <RouterContext {...renderProps} />;
			var xScript = (
				<div>
					<script type="text/javascript" charSet="utf-8" dangerouslySetInnerHTML={{__html: `window[Symbol.for('preData')] = ${JSON.stringify(data.store)};`}}/>
					<script type="text/javascript" async="async" defer="defer" charSet="utf-8" src={'/bundle.js'}/>
				</div>
			);
			var xStyle = (
				<link rel="stylesheetx" type="text/css" href={'/bundle.css'}></link>
			);
			var html = render(template, {
				title: data.title,
				script: ReactDOM.renderToStaticMarkup(xScript),
				style: ReactDOM.renderToStaticMarkup(xStyle),
				'yield': ReactDOM.renderToStaticMarkup(xContent)/*.renderToString*/
			}, true);
			res.end(html);
		}
	}).catch((error)=> {
		if(typeof error == 'number') {
			switch(error) {
				case 404:
					next();
				break;
			}
		} else {
			console.error(error);
			res.sendStatus(500).end('Server error');
		}
	});
});

export default router;

