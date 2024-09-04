
let productos = null;
let numeroElementos = 10;

export function getTotalPaginas() {
    if(productos.length % numeroElementos === 0){
        return productos.length/numeroElementos
    }else{
        return productos.length/numeroElementos + 1
    }
}
export function numeroElementosPorPag() {
    return numeroElementos
}

export async function cargarProductos() {
    try {
        const URLrepuestos = "../../piezas.json"
        const repuestosAPI = await fetch(URLrepuestos)

        if(!repuestosAPI.ok){
            throw(new Error("No se pueden cargar los artículos de la página"))
        }
        const data = await repuestosAPI.json()
        productos = data.piezas
    } catch (error) {
        console.log(error)
    }
}
export function getProductos(){
    return productos;
}

