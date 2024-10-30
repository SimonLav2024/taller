
document.addEventListener('DOMContentLoaded', function(){
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
        console.log(thumb);
        modal.style.display = "block";
        modalImg.src = thumb.getAttribute("data-full");
        modalImg.alt = thumb.alt;
    });
});

// esto es para cerrar el modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.onclick = (event) => {
    if(event.target.classList.contains("modal-content")){
        modal.style.display = "none";
    }
}
//fin

// -------------------------------------formulario--------------------------------------

// ---------------funcion para mostrar los errores en columna si hay mas de uno--------------------
function mostrarErroresColumna(errores){
    let texto = "";
    errores.map(error => {
        texto += `<p>${error}</p>`
    });
return texto;
}
// -----------------------------fin-----------------------------------

    const form = document.getElementById("formulario");
    const mensajeError = document.getElementById("mensajeError");
    let errores = [];

    form.addEventListener('submit', function(event){
// -----------------------Nombre----------------------------------------------------------------------
        const nombre = document.getElementById("nombre");
        if(nombre.value.trim() === ""){
        errores.push("El nombre es obligatorio.");
        }
    

// -----------------------Correo electronico-----------------------------------------------------------
    const correo = document.getElementById("correo");
    if(correo.value.trim() === ""){
        errores.push("El correo electronico es obligatorio.");
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)){
        errores.push("El formato del correo no es válido.");
    }

// ----------------------------Políticas---------------------------------------------------------------
    const aceptoPoliticas = document.getElementById("aceptarAcuerdo");
    if (!aceptoPoliticas.checked) {
        errores.push("Debes aceptar las políticas de uso de datos.");
    }

// -----------------------mensaje error----------------------------------------------
    if(errores.length > 0){
        event.preventDefault();
        mensajeError.innerHTML = mostrarErroresColumna(errores);
        mensajeError.classList.remove("oculto");
    }else{
        mensajeError.classList.add("oculto");
    }
});


});


