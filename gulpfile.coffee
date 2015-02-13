gulp         = require 'gulp'
path         = require 'path'
runSequence  = require 'run-sequence'
del          = require 'del'

browserify   = require 'browserify'
transformify = require 'transformify'
riotify      = require 'riotify'
source       = require 'vinyl-source-stream'
buffer       = require 'vinyl-buffer'
sourcemaps   = require 'gulp-sourcemaps'
streamify    = require 'gulp-streamify'
uglify       = require 'gulp-uglify'

replace      = require 'gulp-replace'
cssimport    = require 'gulp-cssimport'
autoprefixer = require 'gulp-autoprefixer'
minifyCss    = require 'gulp-minify-css'
concat       = require 'gulp-concat'

deploy       = require 'gulp-gh-pages'

browserSync  = require 'browser-sync'
reload       = browserSync.reload

$ =
  dist:       './dist/'
  js:         './src/**/*.js'
  app:        './src/app.js'
  css:        './src/**/*.css'
  style:      './src/style.css'
  components: './src/components/*.tag'
  others:     ['./src/index.html']
  generated:  './dist/**/*'
  deployOpts:
    origin:   'origin'
    branch:   'gh-pages'
    cacheDir: 'cache'

gulp.task 'default', (cb) ->
  runSequence 'clean', [
    'browserify'
    'css'
    'others'
  ], cb

gulp.task 'clean', (cb) -> del [$.dist], cb

gulp.task 'browserify', ->
  browserify
    entries: [$.app]
    debug: true
  # exclude style from tag file
  .transform transformify (tag) -> tag.replace /<style>[\s\S]*<\/style>/gm, ''
  .transform riotify
  .bundle()
  .pipe source path.basename $.app
  .pipe buffer()
  .pipe sourcemaps.init loadMaps: true
  .pipe streamify uglify()
  .pipe sourcemaps.write './'
  .pipe gulp.dest $.dist

gulp.task 'css', ->
  gulp.src [$.style, $.components]
  # extract style from tag file
  .pipe replace /(^[\s\S]*<style>|<\/style>[\s\S]*$)/gm, ''
  .pipe cssimport()
  .pipe autoprefixer 'last 2 versions'
  .pipe minifyCss keepSpecialComments: 0
  .pipe concat path.basename $.style
  .pipe gulp.dest $.dist

gulp.task 'others', ->
  gulp.src $.others
  .pipe gulp.dest $.dist

gulp.task 'deploy', ->
  gulp.src $.generated
  .pipe deploy $.deployOpts

gulp.task 'watch', ->
  browserSync.init
    notify: false
    server: baseDir: $.dist
  o = debounceDelay: 3000
  gulp.watch [$.js, $.components], o, ['browserify']
  gulp.watch [$.css, $.components], o, ['css']
  gulp.watch [$.root], o, ['others']
  gulp.watch [$.generated], o, reload
