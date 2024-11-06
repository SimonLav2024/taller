

import { addCarrito, updateCarrito } from "./meterEnCarro.js";

updateCarrito()

let listapiezas = [];
export function displayRepuestos(inicio, fin) {
    fetch("controller/mostrarpiezas.php").then(response => response.json()).then(piezas => {
        const mostrarPiezas = document.getElementById("products");
        listapiezas = piezas;
        mostrarPiezas.innerHTML = "";
        piezas.slice(inicio, fin).forEach(pieza => {
            mostrarPiezas.innerHTML += `
                <div class="repuesto">
                    <img src="img/Repuestos/${pieza.img}">
                    <h2 class="item1">${pieza.nombre}</h2>
                    <h2 class="item2">Precio: ${pieza.precio} €</h2>
                    <p class="item3">${pieza.marca_pieza}</p>
                    <p class="item4">Vehículos compatibles: ${pieza.coche_compatible}</p>
                    <button data-set="${pieza.id}" class="add">Comprar</button>
                </div>
            `
        })
        const botonesComprar = document.querySelectorAll(".add");
        botonesComprar.forEach(boton => {
            boton.addEventListener("click", addCarrito)
    });
    })
}

let productos = null;
let numeroElementos = 10;

export function getTotalPaginas() {
    if(listapiezas.length % numeroElementos === 0){
        return listapiezas.length/numeroElementos
    }else{
        return listapiezas.length/numeroElementos + 1
    }
}
export function numeroElementosPorPag() {
    return numeroElementos
}

export function getProductos(){
    return listapiezas;
}


// export function displayRepuestos(inicio, fin){
//     const repuestos = getProductos();
//     let contenedor = "";
//     if(repuestos && Array.isArray(repuestos)){
//         repuestos.slice(inicio, fin).map(repuesto => {
//             contenedor += `
//             <div class="repuesto">
//             <img class="imagen" src="${repuesto.img}" alt="${repuesto.nombre}"></img>
//             <h3>${repuesto.nombre}</h3>
//                 <div class="repuesto-texto">
//                 <p class="precio">${repuesto.precio} €</p>
//                 <p class="marca">${repuesto.marca}</p>
//                 <p class="modelo_valido">${repuesto.modelo_valido}</p>
//                 <button data-set="${repuesto.id}" class="add">Comprar</button>
//                 </div>
//             </div>
//             `
//         })
//     }else{
//         contenedor = "<p>No hay productos disponibles</p>"
//     }
//     document.getElementById("products").innerHTML = contenedor;

//     const botonesComprar = document.querySelectorAll(".add");
    
//     botonesComprar.forEach(boton => {
//         boton.addEventListener("click", addCarrito)
//     });
//     }
