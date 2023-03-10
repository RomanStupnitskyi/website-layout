import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const img = () => {
    return app.gulp.src(app.path.src.img)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.newer(app.path.build.img))
        .pipe(app.plugins.if(app.build, webp()))
        .pipe(app.plugins.if(app.build, app.gulp.dest(app.path.build.img)))
        .pipe(app.plugins.if(app.build, app.gulp.src(app.path.src.img)))
        .pipe(app.plugins.if(app.build, app.plugins.newer(app.path.build.img)))
        .pipe(app.plugins.if(app.build, imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        })))
        .pipe(app.gulp.dest(app.path.build.img))
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.img))
        .pipe(app.plugins.browsersync.stream());
}