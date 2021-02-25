
const {series,src,dest,watch} = require('gulp');    /*trae gulp de node modules //extrae series de gulp */
const sass = require('gulp-sass');
//uno lleva llave porque tiene multiples funciones
//series varias funciones
//simultaneo hacerlo al mismo tiempo
//src usa return, es para buscar el contenido de algo
//watch hacer cambios en ciertos archivos cada vez que haya cambios

function css( ){
    return src('FestivalMusica_inicio/scss/app.scss')
        .pipe(  sass({
            outputStyle: 'expanded'                 
        }) )    //ejecutate primero,
        .pipe(  dest('./build/css') )
} 


function minimizar(){
    return src('FestivalMusica_inicio/scss/app.scss')
    .pipe(  sass({
        outputStyle: 'compressed'                 //estilo de el css, la hoja literal compressed o expanded
    }) )    //ejecutate primero,
    .pipe(  dest('./build/css') )
}


function watchArchivo(){
    //que archivo? que cambios?
    //watch('FestivalMusica_inicio/scss/*.scss',css); // * escuchame todos los que tengan esta extencion
    watch('FestivalMusica_inicio/scss/**/*.scss',css); // * escuchame TODO EN ESTA CARPETA CON ESTA TERMINACION
}

exports.css = css;
exports.minimizar = minimizar;
exports.watchArchivos = watchArchivo;

