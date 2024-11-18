
// const products = [
//     { id: 1, name: "BMW", model: "Serie 7 740i", price: 5900, image: "./img/cars/bmw-740.jpg", year: "1994", km: "234000" },
//     { id: 2, name: "Honda", model: "Accord Sport 2.0", price: 6450, image: "./img/cars/honda-accord-7.jpg", year: "2006", km: "130000" },
//     { id: 3, name: "Hyundai", model: "Coupe 2.0", price: 3500, image: "./img/cars/hyundai-coupe.jpg", year: "2004", km: "156321" },
//     { id: 4, name: "Toyota", model: "Celica GTS", price: 7000, image: "./img/cars/toyota-celica.jpg", year: "2005", km: "160000" },
//     { id: 5, name: "Toyota", model: "Supra MK4", price: 54000, image: "./img/cars/toyota-supra.jpg", year: "1994", km: "56000" },
//     { id: 6, name: "Mitsubishi", model: "Lancer Evo 7", price: 55000, image: "./img/cars/evo-7.jpg", year: "2001", km: "53300" },
//     { id: 7, name: "Subaru", model: "Impreza WRX STi", price: 56000, image: "./img/cars/Subaru_WRX_STi.jpg", year: "2004", km: "37890" },
//     { id: 8, name: "Mazda", model: "RX7", price: 45000, image: "./img/cars/Mazda-rx7.jpg", year: "1994", km: "78000" },
//     { id: 9, name: "Mazda", model: "RX8", price: 10500, image: "./img/cars/Mazda_RX-8.jpg", year: "2007", km: "34500" },
//     { id: 10, name: "Chevrolet", model: "Chevelle SS 396", price: 78000, image: "./img/cars/chevelle-70.jpg", year: "1970", km: "25000" },
//     { id: 11, name: "Dodge", model: "Charger R/T 440", price: 69000, image: "./img/cars/Dodge-Charger.jpg", year: "1968", km: "67000" },
//     { id: 12, name: "Mercedes-Benz", model: "W201", price: 54000, image: "./img/cars/mercedes.jpg", year: "1990", km: "356000" },
// ];

const productosContainer = document.getElementById("products");
let cardProducts = [];
const itemsCarrito = document.getElementById("cart-items");
const mostrarCarrito = document.getElementById("toggle-cart");
const carrito = document.getElementById("cart");
const totalCarrito = document.getElementById("cart-total");
const contador = document.getElementById("contador");
let listacoches = [];

const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
let menuOpen = false;

function renderizarCoches() {
    fetch("controller/mostrarcoches.php").then(response => response.json()).then(coches => {
        const mostrarCoches = document.getElementById("products");
        listacoches = coches;
        coches.forEach(coche => {
            mostrarCoches.innerHTML += `
             <div class="fade-in">
                <div class="product-card">
                    <img src="img/cars/${coche.img}" class="anchoImg">
                    <h2 class="item1">${coche.marca}</h2>
                    <h2 class="item2">${coche.modelo}</h2>
                    <p class="item3">Año ${coche.año}</p>
                    <p class="item4">${coche.kilometros} kilómetros</p>
                    <p class="item5">Precio: <b>${coche.precio} €</b></p>
                    <button class="verDetalles" onclick="verDetalles(this)">Ver Descripción</button>
                    <p id="item6">${coche.descripcion}</p>
                    <button class="botonComprar" onclick="addCarrito(${coche.id})">Comprar</button>
                </div>
            </div>
            `
        })
    })
}
function verDetalles(link) {
    var descriptionElement = link.nextElementSibling;
    if (descriptionElement.style.display == 'block') {
      descriptionElement.style.display = 'none';
      link.textContent = 'Ver Descripción';
    } else {
      descriptionElement.style.display = 'block';
      link.textContent = 'Ocultar Descripción';
    }
}

// function renderizarProducts(){
//     productosContainer.innerHTML = products.map(producto => `
//         <div class="fade-in">
//             <div class="product-card">  
//                 <img src="${producto.image}" class="lazy" alt="${producto.name}"/>
//                 <h3>${producto.name} ${producto.model}</h3>
//                 <h4>Del año ${producto.year}</h4>
//                 <h4>${producto.km} kilómetros</h4>
//                 <p>Precio:<b> ${producto.price} €</b></p>
//                 <button class="botonComprar" onclick="addCarrito(${producto.id})">Comprar</button>
//             </div>
//         </div>`
//     ).join(" ");
// }
function addCarrito(cocheId){
   const productoComprado = listacoches.find(coche => coche.id === cocheId);
    cardProducts.push({...productoComprado});
    updateCarrito();
}
function updateCarrito(){
    itemsCarrito.innerHTML = cardProducts.map((item, index) => 
        `<div class="cart-item">
            <span class="elim">${item.marca} - ${item.modelo} ${item.precio} €</span>
            <button onclick="eliminarCarrito(${index})" class="elim">Eliminar</button>
        </div>`).join(" ");

    const total = cardProducts.reduce((sum, item) => sum + parseFloat(item.precio), 0);
    totalCarrito.textContent = `Total ${total.toFixed(2)} €`;
    
    
    if(cardProducts.length === 0){
        contador.textContent = "";
    }else{
        contador.textContent = cardProducts.length;
    }
    guardarCarrito();
}
function eliminarCarrito(indice){
    cardProducts.splice(indice, 1);
    updateCarrito();
}
mostrarCarrito.addEventListener('click', () => {
    if(carrito.classList.toggle("open")){
        sidebar.classList.remove('open');
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});
carrito.addEventListener('click', (event) => {
    if(!event.target.classList.contains("elim") && !event.target.classList.contains("buy")) {
        carrito.classList.toggle("open");
    }
});
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
function Comprar(indice){
    cardProducts.splice(indice, 1);
    updateCarrito();
}
renderizarCoches();
cargarCarrito();

mostrarCarrito.addEventListener('click', () => {
    mostrarCarrito.classList.toggle('pausadoBtn');
});

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
sidebar.addEventListener('click', () => {
    if(sidebar) {
        menuBtn.classList.remove('open');
        sidebar.classList.remove('open');
        menuOpen = false;
    }
});

function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      if (windowHeight * 0.75 <= rect.top) {
        el.classList.remove('is-visible');
      }else{
        el.classList.add('is-visible');
      }
    });
  }
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);



// Lazy loading con Intersection Observer
// document.addEventListener("DOMContentLoaded", function() {
//     var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

//     if ("IntersectionObserver" in window) {
//         let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
//             entries.forEach(function(entry) {
//                 if (entry.isIntersecting) {
//                     let lazyImage = entry.target;
//                     lazyImage.src = lazyImage.dataset.src;
//                     lazyImage.classList.remove("lazy");
//                     lazyImageObserver.unobserve(lazyImage);
//                 }
//             });
//         });

//         lazyImages.forEach(function(lazyImage) {
//             lazyImageObserver.observe(lazyImage);
//         });
//     }
// });
// Fin
