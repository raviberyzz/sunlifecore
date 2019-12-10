const gulp = require('gulp'),
 cssnano = require('gulp-cssnano'),
 sass = require('gulp-sass'),
 concat = require('gulp-concat'),
 uglify = require('gulp-uglify'),
 browserSync = require('browser-sync').create(),
 clean = require('gulp-clean'),
 fs   = require('fs'),
 fse = require('fs-extra')
 path = require('path'),
 sort = require('gulp-sort'),
 flatten = require('gulp-flatten');
 gulpif = require('gulp-if');

gulp.task('browser-sync', () => {
  browserSync.init({
    proxy: 'http://localhost:3000'
  });
});

const compareFiles = (f1, f2) => {
  const f1Name = path.basename(f1.path);
  const f2Name = path.basename(f2.path);
  if(isNaN(f1Name.split('-')[0]) || isNaN(f2Name.split('-')[0])) {
    return f1Name > f2Name ? 1 : -1;
  }
  return Number(f1Name.split('-')[0]) > Number(f2Name.split('-')[0]) ? 1 : -1;
}

const compareNames = (f1, f2) => {
  if(isNaN(f1.split('-')[0]) || isNaN(f2.split('-')[0])) {
    return f1 > f2 ? 1 : -1;
  }
  return Number(f1.split('-')[0]) > Number(f2.split('-')[0]) ? 1 : -1;
}

gulp.task('core-sass', () => {
  return gulp.src('src/views/core/**/*.scss')
    .pipe(sass())
    .pipe(sort(compareFiles))
    .pipe(concat('style.css'))
    //.pipe(cssnano())
    .pipe(gulp.dest('public/core/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('vendor-css',() => {
  return gulp.src('src/views/core/vendor/**/*.css')
  .pipe(sort(compareFiles))
  .pipe(concat('vendor.css'))
  //.pipe(cssnano())
  .pipe(gulp.dest('public/vendor/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});
gulp.task('core-js',() => {
  return gulp.src('src/views/core/components/**/*.js')
  .pipe(sort(compareFiles))
  .pipe(concat('script.js'))
  //.pipe(uglify())
  .pipe(gulp.dest('public/core/js'))
  .pipe(browserSync.reload({
    stream: true
  }))
});
gulp.task('core-fonts',() => {
  return gulp.src('src/views/core/**/resources/*.*')
  .pipe(flatten({ includeParents: -1} ))
  .pipe(gulp.dest('public/vendor'))
  .pipe(browserSync.reload({
    stream: true
  }))
});
gulp.task('vendor-js',() => {
  return gulp.src(['src/views/core/vendor/**/*.js'])
  .pipe(sort(compareFiles))
  .pipe(concat('vendor.js'))
  //.pipe(uglify())
  .pipe(gulp.dest('public/vendor/js'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('watch', function () {
  gulp.watch('src/views/core/**/*.scss', gulp.series('core-sass')); 
  gulp.watch('src/views/core/**/*.js', gulp.series('core-js')); 
  gulp.watch('src/views/core/vendor/**/*.css', gulp.series('vendor-css')); 
  gulp.watch('src/views/core/vendor/**/*.js', gulp.series('vendor-js')); 
  gulp.watch('src/views/core/**/resources/*.*', gulp.series('core-fonts')); 
})

gulp.task('clean', () => {
  return gulp.src('dist')
    .pipe(gulpif(fs.existsSync('dist'),clean({read: false, force: true})))
});

gulp.task('compile-sass',() =>{
  return gulp.src('src/views/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'))
});

gulp.task('copy-files',() => {
  return gulp.src(['src/views/**/*.js','src/views/**/*.css','src/views/**/resources/*.*'])
  .pipe(gulp.dest('dist'))
});

const generateClientLibs = (cb) => {
  fs.readdirSync('dist').forEach( (name) => {
    const parentFolder = path.join('dist', name)
    const stat = fs.statSync(parentFolder)
    if (stat.isDirectory()) {
      const pClientLib = path.join(parentFolder,'clientlibs');
      checkAndCreateDir(pClientLib);
      fs.readdirSync(parentFolder).forEach((cname) => {
        if(cname != 'clientlibs' && cname != 'components') {
          fse.moveSync(path.join(parentFolder,cname),path.join(pClientLib,cname));
          createClientLibs(path.join(pClientLib,cname),'sunlife.'+name+'.'+cname);
        } else if (cname === 'components') {
          parseComponentFolders(path.join(parentFolder,cname),'sunlife.'+name+'.component');
        }
      });
    } 
  })
  cb();
}

const parseComponentFolders = (fpath,name) => {
  const css = fs.readdirSync(fpath).filter((n) => { return n.endsWith('.css')});
  const js = fs.readdirSync(fpath).filter((n) => { return n.endsWith('.js')});
  if(css.length > 0 || js.length > 0 ) {
    const pClientLib = path.join(fpath,'clientlibs');
    checkAndCreateDir(pClientLib);
    css.forEach((fname) => {
      fse.moveSync(path.join(fpath,fname),path.join(pClientLib,fname));
    });
    js.forEach((fname) => {
      fse.moveSync(path.join(fpath,fname),path.join(pClientLib,fname));
    });
    createClientLibs(pClientLib,name);
  } else {
    fs.readdirSync(fpath).forEach((cname) => {
      const cPath = path.join(fpath,cname);
      if(fs.statSync(cPath).isDirectory()) {
        parseComponentFolders(cPath,name);
      }
    });
  }
}

const checkAndCreateDir = (p) => {
  if(!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
}

const createClientLibs = (p,name) => {
  checkAndCreateDir(path.join(p,'js'));
  checkAndCreateDir(path.join(p,'css'));
  const css = fs.readdirSync(p).filter((n) => { return n.endsWith('.css')});
  const js = fs.readdirSync(p).filter((n) => { return n.endsWith('.js')});
  let cssContent = '#base=css\n';
  let jsContent = '#base=js\n';
  css.sort(compareNames).forEach((fname) => {
    cssContent+=fname+'\n';
    fse.moveSync(path.join(p,fname),path.join(p,'css',fname));
  });
  js.sort(compareNames).forEach((fname) => {
    jsContent+=fname+'\n';
    fse.moveSync(path.join(p,fname),path.join(p,'js',fname));
  });
  fs.writeFileSync(path.join(p,'js.txt'),jsContent);
  fs.writeFileSync(path.join(p,'css.txt'),cssContent);
  fs.writeFileSync(path.join(p,'.content.xml'),clientLibContentXMLContent(name));
}

const clientLibContentXMLContent = (cName) => {
  return '<?xml version="1.0" encoding="UTF-8"?>\n'+
  '<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"\n'+
   'jcr:primaryType="cq:ClientLibraryFolder"\n'+
   'allowProxy="{Boolean}true"\n' +
    'categories="['+cName+']"/>';
}

gulp.task('copy-build-files',() => {
  return gulp.src(['dist/**','dist/**/.*'])
  .pipe(gulp.dest('../ui.apps/src/main/content/jcr_root/apps/sunlife'));
});

gulp.task('dev',gulp.parallel('core-sass','vendor-css','vendor-js','core-js','core-fonts','watch','browser-sync'));
gulp.task('build:dev',gulp.series('copy-files','compile-sass',generateClientLibs,'copy-build-files','clean'));