// El simbolo de carga
import { showLoading, hideLoading } from "./loading.js";
// Fin

// La API de repuestos que se va a consultar, las paginas y el numero de elementos por pagina
import { cargarProductos, getTotalPaginas, numeroElementosPorPag } from "./api-repuestos.js";
// Fin

// Lo que se va a mostrar en la pantalla de la pagina web
import { displayRepuestos } from "./renderRepuestos.js";
// Fin


// Esto es para hacer la paginación
let pagina = 1;

const botonAnterior = document.getElementById("btnAnterior");
const botonSiguente = document.getElementById("btnSiguiente");
botonSiguente.addEventListener("click", () => {
    if(pagina < getTotalPaginas()){
        pagina++
        const inicio = (pagina * numeroElementosPorPag()) - numeroElementosPorPag()
        const fin = pagina * numeroElementosPorPag() - 1
        displayRepuestos(inicio, fin)
        botonAnterior.style.display = "block"
    }
    if(pagina === getTotalPaginas()){
        botonSiguente.style.display = "none"
    }
})

botonAnterior.addEventListener("click", () => {
    if(pagina === 1){
        botonAnterior.style.display = "none"
    }else{
        pagina--
        displayRepuestos(inicio, fin)
    }
})
// Fin

// La funcion que se encarga de mostrar todo lo que hay por pantalla en el contenedor
let inicio = 0;
let fin = 9;
async function mostrarProductos(){
    showLoading();
    await cargarProductos();
    displayRepuestos(inicio, fin)
    hideLoading();
}
mostrarProductos();


// Fin

// Sidebar
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        sidebar.classList.add('open');
        menuOpen = true;
        carrito.classList.remove("open");
    } else {
        menuBtn.classList.remove('open');
        sidebar.classList.remove('open');
        menuOpen = false;
    }
});
// Fin

// Carrito
const mostrarCarrito = document.getElementById("toggle-cart");
const carrito = document.getElementById("cart");

mostrarCarrito.addEventListener('click', () => {
    if(carrito.classList.toggle("open")){
        sidebar.classList.remove('open');
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});
carrito.addEventListener('click', (event) => {
    if(!event.target.classList.contains("elim")) {
        carrito.classList.toggle("open");
    }
});
// Fin
