
const {series,src,dest,watch,parallel} = require('gulp');    /*trae gulp de node modules //extrae series de gulp */
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin'); 
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

//uno lleva llave porque tiene multiples funciones
//series varias funciones
//simultaneo hacerlo al mismo tiempo
//src usa return, es para buscar el contenido de algo
//watch hacer cambios en ciertos archivos cada vez que haya cambios


//utilidades css

const autoprefixer = require ('autoprefixer'); //agregar prefijos
const postcss = require('gulp-postcss');    //procesamiento
const cssnano = require('cssnano'); //optimiza el codigo 
const sourcemaps = require('gulp-sourcemaps');


//utilidades js

const terser = require('gulp-terser-js');

const paths = {
    imagenes : 'FestivalMusica_inicio/src/img/**/*',
    scss: 'FestivalMusica_inicio/scss/**/*.scss',
    js: 'FestivalMusica_inicio/src/**/*.js'
}


function css(){
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(  sass() )    //ejecutate primero,
        .pipe ( postcss ( [ autoprefixer() ,cssnano() ] ) )
        .pipe( sourcemaps.write('.'))
        .pipe(  dest('./build/css') )
        .pipe( notify({message: 'css anda bien'}))      
} 

function minificar(){
    return src(paths.scss)
        .pipe(  sass({
            outputStyle: 'compressed'                 //estilo de el css, la hoja literal compressed o expanded
        }) )    
    .pipe(  dest('./build/css') )
}

function imagenes(){
    return src(paths.imagenes) //lee todo lo que este ahi
        .pipe( imagemin() )
        .pipe( dest('./build/img'))
        .pipe( notify({message: 'Imagen Minificada'}));
}

function versionWebp() {
    return src(paths.imagenes) 
        .pipe(webp())
        .pipe( dest('./build/img')) 
        .pipe(notify({message: 'Imagen webp lista'}) );
}

function javascript(){
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js')) //no funciona
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/js'))
        .pipe( rename( { suffix: '.min'}))
        .pipe(notify({message: 'javascript listo'}) );
}

function watchArchivos(){
    watch(paths.scss,css); // * escuchame TODO EN ESTA CARPETA CON ESTA TERMINACION
    watch(paths.js,javascript);
}

exports.css = css;
exports.minificar = minificar;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series(css,javascript,imagenes,versionWebp,watchArchivos); //hace todo junto

