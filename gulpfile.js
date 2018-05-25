var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	pug = require('gulp-pug'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin');

var src = {
	'dev': {
		'stylus': 'dev/stylus/style.styl',
		'js': 'dev/js/*',
		'jslibs': 'dev/js/ext/*.js',
		'pug': 'dev/pug/*.pug',
		'imgs': 'dev/img/*',
		'icons': 'dev/i/*'
	},
	'prod': {
		'css': 'prod/static/css/',
		'js': 'prod/static/js/',
		'jslibs': 'prod/static/js/ext/',
		'html': 'prod/',
		'imgs': 'prod/img/',
		'icons': 'prod/static/i/'
	}
};

// js libs task
gulp.task('js-libs', function () {
	return gulp.src(src.dev.jslibs)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		//.pipe(gulp.dest(src.prod.jslibs))
		//.pipe(rename('vendor.js'))
		.pipe(gulp.dest(src.prod.js));
});

// main js task
gulp.task('js', function () {
	return gulp.src(src.dev.js)
		.pipe(babel({
      presets: ['env'],
      minified: true
    }))
		.pipe(gulp.dest(src.prod.js));
});

// pug task
gulp.task('pug', function () {
	return gulp.src(src.dev.pug)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(src.prod.html));
});

// stylus task and minify
gulp.task('stylus', function () {
	return gulp.src(src.dev.stylus)
		.pipe(stylus({
			compress: true
		}))
		.pipe(gulp.dest(src.prod.css));
});

gulp.task('css-prexify', function () {
	return gulp.src(src.prod.css)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(src.prod.css));
});

// image minify task
gulp.task('image-min', function () {
	return gulp.src(src.dev.imgs)
		.pipe(imagemin())
		.pipe(gulp.dest(src.prod.imgs))
});

gulp.task('icons-min', function () {
	return gulp.src(src.dev.icons)
		.pipe(imagemin())
		.pipe(gulp.dest(src.prod.icons))
});



// Watch-таск для работы
gulp.task('watch', function () {
	gulp.watch(src.dev.pug, ['pug']);
	gulp.watch(src.dev.imgs, ['image-min']);
	gulp.watch(src.dev.icons, ['icons-min']);
	gulp.watch(src.dev.stylus, ['stylus']);
	gulp.watch(src.dev.js + '**/*.js', ['js', 'js-libs']);
});

// Сборка проекта
gulp.task('build', ['pug', 'stylus', 'css-prexify', 'js', 'js-libs', 'image-min', 'icons-min']);
