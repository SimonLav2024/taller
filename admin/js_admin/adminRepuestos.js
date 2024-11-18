const API_URL_REPUESTOS = 'http://localhost/Proyecto-Definitivo/controller_admin/piezas.php';
const errorElement = document.getElementById('createError');
let listaPiezas = [];

// function str){
//     return str.replace(/[^\w. @-]/gi, function(e) {
//         return '&#' + e.charCodeAt(0) + ';';
//     });
// }

function esEntero(str) {
    return /^\d+$/.test(str);
}

function validaciones(nombre, precio, marca_pieza, coche_compatible){
    let errores = [];
    if(nombre.length <= 2 || nombre.length >= 100){
        errores.push('El nombre debe tener entre 2 y 100 caractéres.');
    }
    if(!parseFloat(precio) || precio < 0){
        errores.push('El precio tiene que ser un número válido positivo');
    }
    if(marca_pieza.length <= 2 || marca_pieza.length >= 100){
        errores.push('La marca de la pieza debe tener entre 2 y 100 caractéres');
    }
    if(coche_compatible.length <= 2 || coche_compatible.length >= 1000){
        errores.push('Los coche compatibles deben tener entre 2 y 1000 caractéres');
    }
    return errores;
}

function getRepuestos(){
    fetch(API_URL_REPUESTOS)
        .then(response=> response.json())
        .then(repuestos => {
            const tableBody = document.querySelector('#piezasTable tbody');
            tableBody.innerHTML = '';
            console.log(repuestos)
            
            repuestos.forEach(repuesto => {
                const sanitizedNombre = repuesto.nombre;
                const sanitizedPrecio = repuesto.precio;
                const sanitizedMarca_pieza = repuesto.marca_pieza;
                const sanitizedCoche_compatible = repuesto.coche_compatible;
                
                tableBody.innerHTML += `
                    <tr data-id="${repuesto.id}">
                        <td>
                            ${repuesto.id}
                        </td>
                        <td>
                            <span class="listado">${sanitizedNombre}</span>
                            <input class="edicion" type="text" value="${sanitizedNombre}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedPrecio}</span>
                            <input class="edicion" type="number" value="${sanitizedPrecio}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedMarca_pieza}</span>
                            <input class="edicion" type="text" value="${sanitizedMarca_pieza}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedCoche_compatible}</span>
                            <input class="edicion" type="text" value="${sanitizedCoche_compatible}">
                        </td>
                        <td class="td-btn">
                            <button class="listado" onclick="editMode(${repuesto.id})">Editar</button>
                            <button class="listado" onclick="deletePieza(${repuesto.id})">Eliminar</button>
                            <button class="edicion" onclick="updatePieza(${repuesto.id})">Guardar</button>
                            <button class="edicion" onclick="cancelEdit(${repuesto.id})">Cancelar</button>
                        </td>
                    </tr>
                `
            });
        })
        .catch(error => console.log('Error:', error));
}

function createPieza(event){
    event.preventDefault();
    const nombre = document.getElementById('createNombre').value.trim();
    const precio = document.getElementById('createPrecio').value.trim();
    const marca_pieza = document.getElementById('createMarca').value.trim();
    const coche_compatible = document.getElementById('createCompatibilidad').value.trim();

    let erroresValidaciones = validaciones(nombre, precio, marca_pieza, coche_compatible);
    if(erroresValidaciones.length > 0){
        mostrarErrores(erroresValidaciones);
        return;
    }

    errorElement.innerHTML = '';

    //envio al controlador los datos
    fetch(`${API_URL_REPUESTOS}?metodo=crear`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({nombre, precio, marca_pieza, coche_compatible})
    })
    .then(response => response.json())
    .then(result => {
        console.log('Pieza creada: ', result);
        //if(!esEntero(result['id'])){
        if(!parseInt(result['id'])){
            erroresApi = Object.values(result['id']);
            console.log("erroresApi:",  erroresApi);
            mostrarErrores(erroresApi);
        }else{
            getRepuestos();
        }
        event.target.reset();
    })
    .catch(error => {
        console.log('Error: ', JSON.stringify(error));
    })
}

function updatePieza(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const newNombre = row.querySelector('td:nth-child(2) input').value.trim();
    const newPrecio = row.querySelector('td:nth-child(3) input').value.trim();
    const newMarca = row.querySelector('td:nth-child(4) input').value.trim();
    const newCompatibilidad = row.querySelector('td:nth-child(5) input').value.trim();


    let erroresValidaciones = validaciones(newNombre, newPrecio, newMarca, newCompatibilidad);
    if(erroresValidaciones.length > 0){
        mostrarErrores(erroresValidaciones);
        return;
    }
    errorElement.innerHTML = '';

    fetch(`${API_URL_REPUESTOS}?id=${id}&metodo=actualizar`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({nombre: newNombre, precio: newPrecio, marca_pieza: newMarca, coche_compatible: newCompatibilidad})
   }).then(response => response.json())
     .then(result => {
        console.log('Pieza actualizada', result);
        if(!esEntero(result['affected'])){
            erroresApi = Object.values(result['affected']);
            mostrarErrores(erroresApi);
        }else{
            getRepuestos();
        }
     })
     .catch(error => {
        console.log(error);
        alert('Error al actualizar la Repuesto. Por favor, inténtelo de nuevo.');
     });
}

function mostrarErrores(errores){
    errorElement.innerHTML = '<ul>';
    errores.forEach(error => {
        return errorElement.innerHTML += `<li>${error}</li>`;
    });
    errorElement.innerHTML += '</ul>';
}

function editMode(id){
    errorElement.innerHTML = '';
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.querySelectorAll('.edicion').forEach(ro => {
        ro.style.display = 'inline-block';
    })
    row.querySelectorAll('.listado').forEach(ro => {
        ro.style.display = 'none';
    })
}
function cancelEdit(id){
    errorElement.innerHTML = '';
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.querySelectorAll('.edicion').forEach(ro => {
        ro.style.display = 'none';
    })
    row.querySelectorAll('.listado').forEach(ro => {
        ro.style.display = 'inline-block';
    })
}
function deletePieza(id){
    if(confirm('¿Estás seguro de que quieres eliminar esta pieza?')){
       fetch(`${API_URL_REPUESTOS}?id=${id}&metodo=eliminar`, {
            method: 'POST',
       })
       .then(response => response.json())
       .then(result => {
            console.log('Pieza eliminada: ', result);
            getRepuestos();
       })
       .catch(error => console.error('Error: ', error));
    }
}

getRepuestos()
document.getElementById('createForm').addEventListener('submit', createPieza);
