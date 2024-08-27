
// Parallax
window.addEventListener('scroll', function() {
    var parallax = document.getElementById('parallax');
    var scrollPosition = window.scrollY;
    parallax.style.backgroundPositionY = (scrollPosition * 0.7) + 'px';
});
document.getElementById('parallax').style.backgroundImage = "url('img/Designer.jpeg')";
// fin

// navbar
document.getElementById("boton").addEventListener('click', function toggleMenu(){
    let myNav = document.getElementById("myNavbar");
    if(myNav.className === "navbar"){
        myNav.className += " responsive"
    }else{
        myNav.className = "navbar"
    }
});
// fin


// intersection observer
const imagen1 = document.getElementById('img1');
const imagen3 = document.getElementById("img3");
const imagen4 = document.getElementById("img4");
const imagen5 = document.getElementById("img5");
const imagen6 = document.getElementById("img6");
const imagen7 = document.getElementById("img7");
const imagen8 = document.getElementById("img8");

function cargarImagen(entradas, observador){
    entradas.forEach(entrada => {
        if(entrada.isIntersecting){
            entrada.target.classList.add('visible');
        }else{
            entrada.target.classList.remove('visible');
        }
    });
}
/*
    1. Crear una instancia de la clase IntersectionObserver
    2. Le pasamos por argumento dos parámetros: la función a ejecutar y un objeto con parámetros
    root: null -- indica que va a observar elementos que entren en el viewport que es la pantalla
    rootMargin -- establece un margen en el viewport que nos sirve para agrandar o disminuir el tamaño del viewport a efecto de cuando queremos que empiece a ejecutarse el código
    threshold -- toma un valor entre 0 y 1 -- si tiene un valor de 0.5 el código empieza a ejecutarse cuando el 50% del elemento observado entre en el viewport
*/
const observador = new IntersectionObserver(cargarImagen, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
});
/*
    Agregamos los elementos a observar
*/
observador.observe(imagen1);
observador.observe(imagen3);
observador.observe(imagen4);
observador.observe(imagen5);
observador.observe(imagen6);
observador.observe(imagen7);
observador.observe(imagen8);
// fin

//ventana modal

const modal = document.getElementById("imagenModal");
const modalImg = document.querySelector(".modal-image");
const thumbnail = document.querySelectorAll(".imagenes");
const closeBtn = document.querySelector(".close");

thumbnail.forEach(thumb => {
    thumb.addEventListener("click", () => {
        modal.style.display = "block";
    });
});

// esto es para cerrar el modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// esto tambien sirve para para cerrar el modal
// closeBtn.onclick = () => { modal.style.display = "none"};
//varias formas pero mismo resultado aunk la segunda tiene menos lineas de codigo

window.onclick = (event) => {
    if(event.target.classList.contains("modal-content")){
        modal.style.display = "none";
    }
}
//fin
