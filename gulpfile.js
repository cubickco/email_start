var gulp = require('gulp'),
		sass = require('gulp-sass'),
		inky = require('inky'),
		inlineCss = require('gulp-inline-css'),
		browserSync = require('browser-sync');

gulp.task('sass', function() {
	return gulp.src('app/sass/main.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});
gulp.task('inky', function() {
	return gulp.src('app/index.html')
	.pipe(inky())
	.pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/main.sass', gulp.parallel('sass'));
	gulp.watch('app/sass/main.sass', gulp.parallel('inline'));
	gulp.watch('app/index.html', gulp.parallel('inky'));
	gulp.watch('dist/index.html', gulp.parallel('code'));
});

gulp.task('inline', function() {
    return gulp.src('app/index.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
})
gulp.task('code', function() {
	return gulp.src('dist/index.html')
	.pipe(browserSync.reload({ stream: true }))
});
gulp.task('default', gulp.parallel('sass', 'inky', 'inline', 'watch', 'browser-sync'));