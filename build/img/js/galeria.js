document.addEventListener('DOMContentLoaded', function() {  //esperar a que el documento este listo
    crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <=12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);
        galeria.appendChild(lista);
    }

}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId);
    //generar imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);

    //mostrarlo en el html

    const body = document.querySelector('body');
    body.appendChild(overlay);

}