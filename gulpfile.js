// import packages
import gulp from 'gulp';

// import config
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js'

// import default tasks
import { clear } from './gulp/tasks/clear.task.js';
import { server } from './gulp/tasks/server.task.js';
import { zip } from './gulp/tasks/zip.task.js';
import { ftp } from './gulp/tasks/ftp.task.js';

// import tasks
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.task.js';
import { html } from './gulp/tasks/html.task.js';
import { scss } from './gulp/tasks/scss.task.js';
import { js } from './gulp/tasks/js.task.js';
import { img } from './gulp/tasks/img.task.js';
import { svgSprive } from './gulp/tasks/svgSprite.task.js';

// global vars
global.app = {
    path, gulp, plugins, build: process.argv.includes('--build')
}

// create watcher
const watcher = () => {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.img, img);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
}

export { svgSprive };

// set up tasks
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
const tasks = gulp.series(fonts, gulp.parallel(html, img, scss, js));

// create task for development and production modes
const dev = gulp.series(clear, tasks, gulp.parallel(watcher, server));
const build = gulp.series(clear, tasks);
const deployZIP = gulp.series(clear, tasks, zip);
const deployFTP = gulp.series(clear, tasks, ftp);
// export tasks
export { dev, build, deployZIP, deployFTP };

// gulp tasks
gulp.task("default", dev);