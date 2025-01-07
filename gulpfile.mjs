import gulp from "gulp";
import fileInclude from "gulp-file-include";
import { deleteAsync } from "del";
import browserSyncLib from "browser-sync";

const browserSync = browserSyncLib.create();
const { src, dest, watch, series, parallel } = gulp;

// Пути к папкам
const paths = {
  src: {
    html: "src/**/*.html", // все HTML в src (кроме partials)
    partials: "src/partials/*.html", // partials
    assets: "src/assets/**/*.*", // все файлы в assets
  },
  dist: {
    base: "dist/",
    assets: "dist/assets/",
  },
};

// 1. Очистка dist
export async function clean() {
  // deleteAsync возвращает Promise
  await deleteAsync([paths.dist.base]);
}

// 2. Сборка HTML с include
export function html() {
  // Берём все .html из src, кроме partials
  return src(["src/*.html", "!src/partials/**"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(dest(paths.dist.base))
    .pipe(browserSync.stream());
}

// 3. Копирование ассетов (CSS, JS, images) в dist
export function copyAssets() {
  return src(paths.src.assets)
    .pipe(dest(paths.dist.assets))
    .pipe(browserSync.stream());
}

// 4. Локальный сервер + слежка
export function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist.base,
    },
    port: 3000,
    open