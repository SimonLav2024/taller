import { cargarProductos, getProductos } from "./api-repuestos.js";
import { displayRepuestos } from "./renderRepuestos.js";

const itemsCarrito = document.getElementById("cart-items");
const totalCarrito = document.getElementById("cart-total");
const contador = document.getElementById("contador");
let cardProducts = [];

export function addCarrito(event){
    const piezas = getProductos();
    const piezaId = event.target.getAttribute("data-set")
    const productoComprado = piezas.find(pieza => pieza.id === piezaId);
     cardProducts.push({...productoComprado});
     updateCarrito();
}
export function updateCarrito(){
    itemsCarrito.innerHTML = cardProducts.map((pieza) => 
         `<div class="cart-item">
             <span class="elim">${pieza.nombre} - ${pieza.precio.toFixed(2)} €</span>
             <button data-id="${pieza.id}" class="elim">Eliminar</button>
         </div>`).join(" ");
    const total = cardProducts.reduce((sum, pieza) => sum + pieza.precio, 0);
    totalCarrito.textContent = `Total ${total.toFixed(2)} €`;
    const botonesEliminar = document.querySelectorAll(".elim");
    botonesEliminar.forEach(boton => {
    boton.addEventListener("click", eliminarCarrito);
})
     if(cardProducts.length === 0){
         contador.textContent = "";
     }else{
         contador.textContent = cardProducts.length;
     }
     guardarCarrito();
 }

function guardarCarrito(){
    localStorage.setItem("clave", JSON.stringify(cardProducts));
}
function cargarCarrito(){
    const carritoGuardado = localStorage.getItem("clave");
    if(carritoGuardado){
        cardProducts = JSON.parse(carritoGuardado);
        updateCarrito();
    }
}
cargarCarrito()

function eliminarCarrito(event){
    const borrarArt = event.target.getAttribute("data-id")
    const productoEnCarrito = cardProducts.find(producto => producto.id === borrarArt)
    cardProducts.splice(productoEnCarrito, 1)
    updateCarrito();
}
