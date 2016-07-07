import gulp from 'gulp';
import path from 'path';
import process from 'process';
import less from 'gulp-less';
import concat from'gulp-concat';
import notify from'gulp-notify';
import clean from'gulp-clean';
import webpack from 'webpack-stream';
import { rename, piperStyle } from './gulp.less.js';

var dir = process.cwd();

gulp.task('scripts', ()=> {
	let files = ['scripts', 'scripts.map'], i = 0;
	return gulp.src(
			[ path.join(__dirname, '..', 'client', 'index.js') ]
		).pipe(webpack({
			debug: true,
			devtool: 'source-map',
			output: {
				filename: 'bundle.js',
				sourceMapFilename: '[file].map'
			},
			module: {
				loaders: [
					{
						test: /\.json$/i,
						loader: 'json-loader'
					// },
					// {
					// 	test: /\.js$/i,
					// 	loader: 'babel-loader',
					// 	exclude: false,
					// 	query: {
					// 		presets: ['es2015']
					// 	}
					}
				]
			}
		}))
		.pipe(gulp.dest(path.resolve(dir, 'bundles')))
		.pipe(notify(`Compiled: ${files[i++]}`));
});


gulp.task('styles', ['less'], ()=> {
	// return gulp.src('./static/*.css')
	// 	.pipe(concat('build.css'))
	// 	.pipe(gulp.dest('./static'));
});

gulp.task('clear', ['styles', 'scripts'], ()=> {
	return gulp.src('./static/tmp_*', {read: false})
		.pipe(clean({force: true}))
});

gulp.task('less', ()=> {
	let files = ['styles', 'styles.map'], i = 0;
	return gulp.src(
			[
				path.join(
					__dirname, 
					'..', 
					'node_modules', 
					'inless_dependencies', 
					'*', 
					'style.less'
				)
			]
		)
		.pipe(piperStyle)
		.pipe(less())
		// .pipe(rename)
		.pipe(concat('build.css'))
		.pipe(gulp.dest(path.resolve(dir, 'bundles')))
		.pipe(notify(`Compiled: ${files[i++]}`));
});


gulp.task('default', ['clear'], ()=> {
	console.log('Bundles compiled.');
});

export default ()=> {
	gulp.start(['default']);
}
