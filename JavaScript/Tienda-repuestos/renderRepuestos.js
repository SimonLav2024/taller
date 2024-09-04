
// Importar la API que se va a ver en el navegador
import { getProductos } from "./api-repuestos.js";
// Fin

const urlImg = "https://image.tmdb.org/t/p/w500"

export function displayRepuestos(inicio, fin){
    const repuestos = getProductos();
    let contenedor = "";
    if(repuestos && Array.isArray(repuestos)){
        repuestos.slice(inicio, fin).map(repuesto => {
            contenedor += `
            <div class="repuesto">
            <img class="imagen" src="${urlImg}${repuesto.img}" alt="${repuesto.nombre}"></img>
            <h3>${repuesto.nombre}</h3>
                <div class="repuesto-texto">
                <p class="precio">${repuesto.precio} €</p>
                <p class="marca">${repuesto.marca}</p>
                <p class="modelo_valido">${repuesto.modelo_valido}</p>
                </div>
            </div>
            `
        })
    }else{
        contenedor = "<p>No hay productos disponibles</p>"
    }
    document.getElementById("products").innerHTML = contenedor;
}