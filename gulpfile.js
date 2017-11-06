var	gulp			=	require('gulp'),
	browserSync		=	require('browser-sync'),
	notify			=	require("gulp-notify"),
	sass			=	require('gulp-sass'),
	rename			=	require('gulp-rename'),
	autoprefixer	=	require('gulp-autoprefixer'),
	cleanCSS		=	require('gulp-clean-css'),
	concat			=	require('gulp-concat'),
	uglify			=	require('gulp-uglify'),
	rigger	    	= 	require('gulp-rigger'),
	imagemin        =   require('gulp-imagemin'),
	spritesmith		=	require('gulp.spritesmith'),
	reload          = browserSync.reload;

gulp.task('html', function () {
    gulp.src(['src/html/**/*.html', '!src/html/**/_*.html'])
        .pipe(rigger())
        .on("error", notify.onError())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});

// Setup localhost + automatic browser update
gulp.task('browser-sync', function() {
	browserSync({
		server: {baseDir: 'app'},
		notify: false
	});
});


// Compiling pug in html
gulp.task('pug', function() {
	return gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
		.pipe(pug({pretty: '\t'}))
		.on("error", notify.onError())
		.pipe(gulp.dest('app'));
});


// Compiling sass in css with adding vendor prefixes and compressing css
gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass().on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions', 'ie 8', 'ie 9']))
		// .pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});


// Collects all the scripts specified in gulp.src in one file - scripts.min.js,
// compresses and add it into app/js
gulp.task('scripts', function() {
	return gulp.src([
		// 'app/libs/jquery/dist/jquery.min.js',
		'src/js/*.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('image', function () {
    gulp.src('src/img/*.*') //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('src/img/icons')) //И бросим в build
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('fonts', function() {
    gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('app/fonts'))
});


// Building sprite
gulp.task('sprite', function() {
	var spriteData = gulp.src('src/img/icons/*.*')
	.pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: '_sprite.scss',
		imgPath: '/img/sprite.png',
		cssFormat: 'scss',
		padding: 16
	}))
	.on("error", notify.onError())
	var imgStream = spriteData.img.pipe(gulp.dest('app/img/'));
	var cssStream = spriteData.css.pipe(gulp.dest('src/scss/'));
	return (imgStream, cssStream);
});
// Monitoring for changes in folders, launches appropriate tasks
gulp.task('watch', ['html','sass', 'scripts', 'sprite', 'browser-sync', 'fonts'], function() {
	gulp.watch('src/img/**/*.*', ['sprite']);
	gulp.watch('src/fonts/*.*', ['fonts']);
	gulp.watch('src/html/**/*.html', ['html']);
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
