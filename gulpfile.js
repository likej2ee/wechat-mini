const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const del = require('del');
const runSequence = require('run-sequence');
const prompt = require('prompt')

const SCSS_FILES = './src/**/*.scss'

// 错误处理函数
function errorHandler(src, e) {
  // 控制台发生，错误时beep一下
  gutil.beep();
  if (src) {
    throw new gutil.PluginError(src, e);
  } else {
    gutil.log(src, e);
  }
}

// 确认操作
function toConfirm(tip, onY, onN) {
  _lstStp = step
  step = '_confirm'
  print(tip, '确认 y ,取消 n')
  if ('function' != typeof onY)
    _onConfirmInput = onY
  else
    _onConfirmInput = {
      'y': onY,
      'n': onN
    }
}

// 清理*.wxss文件
gulp.task('clean:wxss', function() {
  // Return the Promise from del()
  // 'return' This is the key here, to make sure asynchronous tasks are done!
  return del('./src/**/*.wxss');
});

// 清理*.scss文件
gulp.task('clean:scss', function() {
  // Return the Promise from del()
  // 'return' This is the key here, to make sure asynchronous tasks are done!
  return del(SCSS_FILES);
});


// 编译scss
gulp.task('sass', function() {
  return gulp.src(SCSS_FILES)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path) {
      path.extname = '.wxss'
    }))
    .pipe(gulp.dest('./src/'));
});

// 监听scss文件变动
gulp.task('sass:watch', function() {
  return gulp.watch(SCSS_FILES, ['sass']);
});

// 备份scss
gulp.task('back', function() {
  return gulp.src(SCSS_FILES)
    .pipe(gulp.dest('./scss'))
})

// 从备份还原scss
gulp.task('reset:scss', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(gulp.dest('./src/'))
})

// 恢复重置scss
gulp.task('reset', function(callback) {

  let schema = {
    properties: {
      confirm: {
        type: 'string',
        require: true,
        default: 'n'
      }
    }
  }
  gutil.log(gutil.colors.bold(gutil.colors.red('请确认您的备份scss是最新版本，该操作不可逆')))
  prompt.start()
  prompt.get(schema, function(err, result) {
    if (!err) {
      if (result.confirm === 'y') {
        runSequence('clean:scss', 'reset:scss', () => {
          callback()
          gutil.log(gutil.colors.green('*.scss文件已从备份还原'))
        })
      } else {
        gutil.log(gutil.colors.green('用户取消操作'))
      }
    }
  })
})

// 发布小程序前优化，备份并删除scss
gulp.task('build', function(callback) {
  runSequence('sass', 'back', 'clean:scss', callback)
})

// 开发启动scss编译及监听
gulp.task('dev', function(callback) {
  runSequence('sass', 'sass:watch', callback)
})

// 默认
gulp.task('default', ['dev'])
