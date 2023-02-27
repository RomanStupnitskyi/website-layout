import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const srcFolder = './src';
const buildFolder = './build';

export const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css`,
        js: `${buildFolder}/js`,
        fonts: `${buildFolder}/fonts`,
        img: `${buildFolder}/img`
    },
    src: {
        html: `${srcFolder}/*.html`,
        scss: `${srcFolder}/scss/style.scss`,
        js: `${srcFolder}/js/index.js`,
        svg: `${srcFolder}/img/**/*.svg`,
        img: `${srcFolder}/img/*.{jpg,jpeg,png,gif,webp}`,
        svgicons: `${srcFolder}/svgicons/*.svg`
    },
    watch: {
        html: `${srcFolder}/**/*.html`,
        scss: `${srcFolder}/scss/**/*.scss`,
        js: `${srcFolder}/js/**/*.js`,
        img: `${srcFolder}/img/*.{jpg,jpeg,png,svg,gif,ico,webp}`
    },
    srcFolder,
    buildFolder,
    rootFolder,
    ftp: `web`
}