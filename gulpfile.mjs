import gulp from "gulp";
import fileInclude from "gulp-file-include";
import { deleteAsync } from "del";
import browserSyncLib from "browser-sync";

const browserSync = browserSyncLib.create();
const { src, dest, watch, series, parallel } = gulp;

// Пути к файлам
const paths = {
  src: {
    html: "src/*.html", // Все HTML-файлы
    partials: "src/partials/*.html", // Частичные HTML
    images: "src/assets/images/**/*.{png,jpg,jpeg,svg,webp}", // Только изображения
    assets: "src/assets/**/*.*", // Все ассеты
  },
  dist: {
    base: "docs/", // Изменено с "dist/" на "docs/"
    images: "docs/assets/images/", // Папка для изображений
    assets: "docs/assets/", // Папка для всех ассетов
  },
};

// === Задачи ===

// Задача 1: Очистка папки dist
export function clean(done) {
  console.log("Cleaning dist folder...");
  deleteAsync([paths.dist.base]).then(() => done());
}

// Задача 2: Обработка HTML с fileInclude
export function html() {
  console.log("Processing HTML...");
  return src([paths.src.html, "!src/partials/**"])
    .pipe(
      fileInclude({
        prefix: "@@", // Префикс для include
        basepath: "@file",
      })
    )
    .on("error", (err) => console.error("HTML Error:", err))
    .pipe(dest(paths.dist.base));
}

// Задача 3: Копирование изображений
export function copyImages() {
  console.log("Copying images...");
  return src(paths.src.images).pipe(dest(paths.dist.images));
}

// Задача 4: Копирование других ассетов
export function copyAssets() {
  console.log("Copying assets...");
  return src([paths.src.assets, `!${paths.src.images}`]) // Копируем всё, кроме изображений
    .pipe(dest(paths.dist.assets));
}

// Задача 5: Локальный сервер (browser-sync)
export function serve(done) {
  console.log("Starting server...");
  browserSync.init({
    server: {
      baseDir: paths.dist.base, // Папка для сервера
    },
    port: 3000, // Порт
    open: true, // Открывать автоматически браузер
  });
  done();
}

// Задача 6: Слежка за файлами
export function watchFiles() {
  console.log("Watching files for changes...");
  watch(paths.src.html, series(html, reloadBrowser));
  watch(paths.src.partials, series(html, reloadBrowser));
  watch(paths.src.images, series(copyImages, reloadBrowser));
  watch(paths.src.assets, series(copyAssets, reloadBrowser));
}

// Вспомогательная задача для обновления браузера
function reloadBrowser(done) {
  console.log("Reloading browser...");
  browserSync.reload();
  done();
}

// === Общие задачи ===

// Задача сборки (очистка, сборка HTML, копирование ассетов)
export const build = series(
  clean,
  parallel(html, copyImages, copyAssets),
  (done) => {
    console.log("Build completed!");
    done();
  }
);

// Режим разработки: сборка + сервер + слежка
export const dev = series(build, serve, watchFiles, (done) => {
  console.log("Development environment is running!");
  done();
});

// Задача по умолчанию: только сборка
export default build;

// Дополнительная задача: только сервер без слежки
export const serveOne = series(build, serve, (done) => {
  console.log("Serve without watching is running!");
  done();
});
