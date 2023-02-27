import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: !app.build })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(app.build, groupCssMediaQueries()))
        .pipe(app.plugins.if(app.build, webcss(
            {
                webpClass: 'webp',
                noWebpClass:'.no-webp'
            }
        )))
        .pipe(app.plugins.if(app.build, autoprefixer({
            grid: true,
            overrideBrowsersList: ["last 3 versions"],
            cascade: true
        })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(app.build, cleanCss()))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}