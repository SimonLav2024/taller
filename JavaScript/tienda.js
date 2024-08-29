

const products = [
    { id: 1, name: "BMW Serie 7 740i", price: 5900, image: "../img/cars/740-i-1.jpg", year: "1994", km: "234000" },
    { id: 2, name: "Honda Accord Sport 2.0", price: 6450, image: "../img/cars/honda-accord.jpg", year: "2006", km: "130000" },
    { id: 3, name: "Hyundai Coupe 2.0", price: 3500, image: "../img/cars/hyundai-coupe.jpg", year: "2004", km: "156321" },
    { id: 4, name: "Toyota Celica GTS", price: 7000, image: "../img/cars/toyota-celica.jpg", year: "2005", km: "160000" },
    { id: 5, name: "Toyota Supra MK4", price: 54000, image: "../img/cars/toyota-supra.jpg", year: "1994", km: "56000" },
    { id: 6, name: "Mitsubishi Lancer Evo 7", price: 55000, image: "../img/cars/evo-7.jpg", year: "2001", km: "53300" },
    { id: 7, name: "Subaru Impreza WRX STi", price: 56000, image: "../img/cars/Subaru_WRX_STi.jpg", year: "2004", km: "37890" },
    { id: 8, name: "Mazda RX7", price: 45000, image: "../img/cars/Mazda-rx7.jpg", year: "1994", km: "78000" },
    { id: 9, name: "Mazda RX8", price: 10500, image: "../img/cars/Mazda_RX-8.jpg", year: "2007", km: "34500" },
    { id: 10, name: "Chevrolet Chevelle SS 396", price: 78000, image: "../img/cars/chevelle-70.jpg", year: "1970", km: "25000" },
    { id: 11, name: "Dodge Charger R/T 440", price: 69000, image: "../img/cars/Dodge-Charger.jpg", year: "1968", km: "67000" },
    { id: 12, name: "Mercedes-Benz W201", price: 54000, image: "../img/cars/mercedes.jpg", year: "1990", km: "356000" },
];

const productosContainer = document.getElementById("products");
let cardProducts = [];
const itemsCarrito = document.getElementById("cart-items");
const mostrarCarrito = document.getElementById("toggle-cart");
const carrito = document.getElementById("cart");
const totalCarrito = document.getElementById("cart-total");
const contador = document.getElementById("contador");

function renderizarProducts(){
    productosContainer.innerHTML = products.map(producto => `
        <div class="product-card">  
            <img src="${producto.image}" alt="${producto.name}"/>
            <h3>${producto.name}</h3>
            <h4>Del año ${producto.year}</h4>
            <h4>${producto.km} kilómetros</h4>
            <p>Precio:<b> ${producto.price} €</b></p>
            <button onclick="addCarrito(${producto.id})">Comprar</button>
        </div>`
    ).join(" ");
}
function addCarrito(productoId){
   const productoComprado = products.find(producto => producto.id === productoId);
    cardProducts.push({...productoComprado});
    updateCarrito();
}
function updateCarrito(){
    itemsCarrito.innerHTML = cardProducts.map((item, index) => 
        `<div class="cart-item">
            <span>${item.name} - ${item.price.toFixed(2)} €</span>
            <button onclick="eliminarCarrito(${index})">Eliminar</button>
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
function eliminarCarrito(indice){
    cardProducts.splice(indice, 1);
    updateCarrito();
}
mostrarCarrito.addEventListener('click', () => {
    carrito.classList.toggle("open");
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
renderizarProducts();
cargarCarrito();
  