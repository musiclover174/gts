var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	pug = require('gulp-pug'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

var src = {
	'dev': {
		'stylus': 'dev/stylus/',
		'js': 'dev/js/*',
		'jslibs': 'dev/js/ext/*.js',
		'pug': 'dev/pug/*.pug',
		'imgs': 'dev/img/*',
		'icons': 'dev/i/*'
	},
	'prod': {
		'css': 'prod/static/css',
		'js': 'prod/static/js/',
		'jslibs': 'prod/static/js/ext/',
		'html': 'prod/',
		'imgs': 'prod/img/',
		'icons': 'prod/static/i/'
	}
};

// server started 
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./prod/"
    }
  });
});

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
      minified: false
    }))
		.pipe(gulp.dest(src.prod.js))
    .pipe(reload({stream:true}));
});

// pug task
gulp.task('pug', function () {
	return gulp.src(src.dev.pug)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(src.prod.html))
    .pipe(reload({stream:true}));
});

// stylus task and minify
gulp.task('stylus', function () {
	return gulp.src(src.dev.stylus + 'style.styl')
		.pipe(stylus())
		.pipe(gulp.dest(src.prod.css));
});

gulp.task('css-make', ['stylus'], function () {
	return gulp.src(src.prod.css + '/style.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(src.prod.css))
    .pipe(reload({stream:true}));
});

gulp.task('css-min', ['css-make'], function () {
	return gulp.src(src.prod.css + '/style.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
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

// Reload all Browsers
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// watch-такс с релоадом
gulp.task('default', ['browser-sync', 'watch'], function () {
  gulp.watch('css/*.css', function (file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch("*.html", ['bs-reload']);
});

// Watch-таск для работы
gulp.task('watch', function () {
	gulp.watch(src.dev.pug, ['pug']);
	gulp.watch(src.dev.imgs, ['image-min']);
	gulp.watch(src.dev.icons, ['icons-min']);
	gulp.watch(src.dev.stylus + '**/*.styl', ['stylus', 'css-make']);
	gulp.watch(src.dev.js + '*/*.js', ['js', 'js-libs']);
});

// Сборка проекта
gulp.task('build', ['pug', 'stylus', 'css-make', 'css-min', 'js', 'js-libs', 'image-min', 'icons-min']);
