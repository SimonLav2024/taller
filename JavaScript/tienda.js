

const products = [
    { id: 1, name: "BMW Serie 7 740i", price: 5900, image: "../img/cars/740-i-1.jpg", sizes: ["S", "M", "L", "XL"], year: "1994", km: "234000" },
    { id: 2, name: "Honda Accord Sport 2.0", price: 19.99, image: "../img/camisetaChica2.jpeg", sizes: ["S", "M", "L", "XL"], year: "2006", km: "" },
    { id: 3, name: "Hyundai Coupe", price: 19.99, image: "../img/camisetaChica3.jpeg", sizes: ["S", "M", "L", "XL"], year: "", km: "" },
    { id: 4, name: "", price: 19.99, image: "../img/camisetaChica4.jpeg", sizes: ["S", "M", "L", "XL"], year: "", km: "" },
    { id: 5, name: "", price: 19.99, image: "../img/camisetaChico1.jpeg", sizes: ["S", "M", "L", "XL"], year: "", km: "" },
    { id: 6, name: "", price: 19.99, image: "../img/camisetaChico2.jpeg", sizes: ["S", "M", "L", "XL"], year: "", km: "" },
    { id: 7, name: "", price: 19.99, image: "../img/camisetaChico3.jpeg", sizes: ["S", "M", "L", "XL"], year: "", km: "" },
    { id: 8, name: "", price: 39.99, image: "../img/pantalon.jpeg", sizes: ["28", "30", "32", "34"], year: "", km: "" },
    { id: 9, name: "", price: 29.99, image: "../img/pantalonPirata.jpeg", sizes: ["28", "30", "32", "34"], year: "", km: "" },
    { id: 10, name: "", price: 59.99, image: "../img/vestido1.jpeg", sizes: ["38", "39", "40", "41", "42"], year: "", km: "" },
    { id: 11, name: "", price: 49.99, image: "../img/vestido2.jpeg", sizes: ["38", "39", "40", "41", "42"], year: "", km: "" },
    { id: 12, name: "", price: 39.99, image: "../img/vestido3.jpeg", sizes: ["38", "39", "40", "41", "42"], year: "", km: "" },
];

const productosContainer = document.getElementById("products");
let cardProducts = [];
const itemsCarrito = document.getElementById("cart-items");
const mostrarCarrito = document.getElementById("toggle-cart");
const carrito = document.getElementById("cart");
const totalCarrito = document.getElementById("cart-total");
const contador = document.getElementById("contador");

// es importante señalar que todas las variables que esten creadas o mencionadas dentro de cualqueor lado en la funcion hay que ponerla asi: ${variable}.
function renderizarProducts(){
    productosContainer.innerHTML = products.map(producto => `
        <div class="product-card">  
            <img src="${producto.image}" alt="${producto.name}"/>
            <h3>${producto.name}</h3>
            <h4>Del año ${producto.year}</h4>
            <h4>${producto.km} kilómetros</h4>
            <p>Precio:<b> ${producto.price} €</b></p>
            <button onclick="addCarrito(${producto.id})">Añadir al carrito</button>
        </div>`
    ).join(" ");
}
function addCarrito(productoId){
   const productoComprado = products.find(producto => producto.id === productoId);
   const size = document.getElementById(`size-${productoComprado.id}`).value;
// para que se refleje la variable funcional las comillas tienes que ser las torcidas esas de al lado de la p: (``) porque si pones de las otras cualquier otras no va a funcionar la variable.
    cardProducts.push({...productoComprado, size});
    
    updateCarrito(); //esto es llamar la funcion para que se muestre
}
function updateCarrito(){
    itemsCarrito.innerHTML = cardProducts.map((item, index) => 
        `<div class="cart-item">
            <span>${item.name} ${item.size} - ${item.price.toFixed(2)} €</span>
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
    localStorage.setItem("clave", JSON.stringify(cardProducts)); // el JSON es para transformar el array en un archivo json.
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

  