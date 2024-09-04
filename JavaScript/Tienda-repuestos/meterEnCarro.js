import { cargarProductos, getProductos } from "./api-repuestos.js";
import { displayRepuestos } from "./renderRepuestos.js";

let cardProducts = [];
const itemsCarrito = document.getElementById("cart-items");
const piezas = getProductos();


export function addCarrito(piezaId){
    const productoComprado = piezas.find(pieza => pieza.id === piezaId);
     cardProducts.push({...productoComprado});
     updateCarrito();
 }
export function updateCarrito(){
     itemsCarrito.innerHTML = cardProducts.map((item, index) => 
         `<div class="cart-item">
             <span class="elim">${item.nombre} - ${item.precio.toFixed(2)} €</span>
             <button onclick="eliminarCarrito(${index})" class="elim">Eliminar</button>
         </div>`).join(" ");
 
     const total = cardProducts.reduce((sum, item) => sum + item.price, 0);
     totalCarrito.textContent = `Total ${total.toFixed(2)} €`;
     
     if(cardProducts.length === 0){
         contador.textContent = "";
     }else{
         contador.textContent = cardProducts.length;
     }
     guardarCarrito();
 }