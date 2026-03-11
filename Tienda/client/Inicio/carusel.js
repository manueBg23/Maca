// Configuración del carrusel
var intervalo = 3000; // Intervalo en milisegundos entre cada cambio de imagen
var index = 0;
var imagenes = document.querySelectorAll('.carousel img');
var totalImagenes = imagenes.length;

function cambiarImagen() {
    index++;
    if (index >= totalImagenes) {
        index = 0;
    }
    actualizarCarousel();
}

function actualizarCarousel() {
    var offset = -index * 100; // Ancho de cada imagen en porcentaje
    document.querySelector('.carousel').style.transform = 'translateX(' + offset + '%)';
}

// Iniciar el carrusel automático
setInterval(cambiarImagen, intervalo);