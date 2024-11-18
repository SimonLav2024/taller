const API_URL = "http://localhost/Proyecto-Definitivo/controller_admin/vehiculos.php";
const errorElement = document.getElementById('createError');
/**
 * 
 * @param {*} str string
 * @returns string limpio de caracteres html
 * Limpia una cadena de texto convirtiendo ciertos caracteres potencialmente  peligrosos en sus equivalentes html seguros
 * [^...] coincide con cualquier carácter que no esté en el conjunto
 * \w Caracteres de palabra, letras, números, guión bajo
 * . @- Admite punto, espacio, arroba y guión medio
 * /gi Flags para que la búsqueda de caracteres sea global (g) e  insensible  a mayúsculas y minúsculas (i) 
 * 
 * funcion(c){return '&#' + caches.charCodeAt(0) + ';'} crea para cada carácter su código en ASCII con charCodeAt() 
 * devuelve la entidad HTML numérica correspondiente, por ejemplo &#60; para < 
 * Esta función se utiliza para prevenir ataques XSS(Cross-Site-Scripting) 
 */
// function (str){
//     return str.replace(/[^\w. @-]/gi, function(e) {
//         return '&#' + e.charCodeAt(0) + ';';
//     });
// }

function esEntero(str) {
    return /^\d+$/.test(str);
}

function validaciones(marca, modelo, año, kilometros, precio, descripcion){
    let errores = [];
    if(marca.length <= 2 || marca.length >= 50){
        errores.push('La marca debe tener entre 2 y 50 caractéres.');
    }
    if(modelo.length <= 2 || modelo.length >= 50){
        errores.push('El modelo debe tener entre 2 y 50 caractéres.');
    }  
    if(año.length <=3 || año.length >= 5){
        errores.push('El año del vehículo no es valido, debe ser entre el año 1000 y el 9999.');
    }
    if(kilometros.length <= 1 || kilometros.length >= 8){
        errores.push('Los kilómetros han de ser entre 1 y 8 caractéres.');
    }
    if(precio.length <= 1 || precio.length >= 7){
        errores.push('El precio debe ser entre 1 y 1000000 de euros.');
    }
    if(descripcion.length <= 2 || descripcion.length >= 500){
        errores.push('La descripción debe tener entre 2 y 500 caractéres.');
    }
    return errores;
}


function getVehiculos(){
    fetch(API_URL)
        .then(response=> response.json())
        .then(vehiculos => {
            const tableBody = document.querySelector('#vehiculosTable tbody');
            tableBody.innerHTML = '';
            vehiculos.forEach(vehiculo => {
                const sanitizedMarca = vehiculo.marca;
                const sanitizedModelo = vehiculo.modelo;
                const sanitizedAño = vehiculo.año;
                const sanitizedKilometros = vehiculo.kilometros;
                const sanitizedPrecio = vehiculo.precio;
                const sanitizedDescripcion = vehiculo.descripcion;
                tableBody.innerHTML += `
                    <tr data-id="${vehiculo.id}">
                        <td>
                            ${vehiculo.id}
                        </td>
                        <td>
                            <span class="listado">${sanitizedMarca}</span>
                            <input class="edicion" type="text" value="${sanitizedMarca}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedModelo}</span>
                            <input class="edicion" type="text" value="${sanitizedModelo}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedAño}</span>
                            <input class="edicion" type="text" value="${sanitizedAño}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedKilometros}</span>
                            <input class="edicion" type="text" value="${sanitizedKilometros}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedPrecio}</span>
                            <input class="edicion" type="text" value="${sanitizedPrecio}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedDescripcion}</span>
                            <textarea class="edicion">${sanitizedDescripcion}</textarea>
                        </td>
                        <td class="td-btn">
                            <button class="listado" onclick="editMode(${vehiculo.id})">Editar</button>
                            <button class="listado" onclick="deleteDirector(${vehiculo.id})">Eliminar</button>
                            <button class="edicion" onclick="updateDirector(${vehiculo.id})">Guardar</button>
                            <button class="edicion" onclick="cancelEdit(${vehiculo.id})">Cancelar</button>
                        </td>
                    </tr>
                `
            });

        })
        .catch(error => console.log('Error:', error));
}

function createVehiculo(event){
    event.preventDefault();
    const marca = document.getElementById('createMarca').value.trim();
    const modelo = document.getElementById('createModelo').value.trim();
    const año = document.getElementById('createAño').value.trim();
    const kilometros = document.getElementById('createKilometros').value.trim();
    const precio = document.getElementById('createPrecio').value.trim();
    const descripcion = document.getElementById('createDescripcion').value.trim();

    let erroresValidaciones = validaciones(marca, modelo, año, kilometros, precio, descripcion);

    if(erroresValidaciones.length > 0){
        mostrarErrores(erroresValidaciones);
        return;
    }

    errorElement.innerHTML = '';

    //envio al controlador los datos
    fetch(`${API_URL}?metodo=crear`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({marca, modelo, año, kilometros, precio, descripcion})
    })
    .then(response => response.json())
    .then(result => {
        console.log('Vehículo añadido: ', result);
        //if(!esEntero(result['id'])){
        if(!parseInt(result['id'])){
            erroresApi = Object.values(result['id']);
            console.log("erroresApi:",  erroresApi);
            mostrarErrores(erroresApi);
        }else{
            getVehiculos();
        }
        event.target.reset();
    })
    .catch(error => {
        console.log('Error: ', JSON.stringify(error));
    })
}

function updateVehiculo(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const newMarca = row.querySelector('td:nth-child(2) input').value.trim();
    const newModelo = row.querySelector('td:nth-child(3) input').value.trim();
    const newAño = row.querySelector('td:nth-child(4) input').value.trim();
    const newKilometros = row.querySelector('td:nth-child(5) input').value.trim();
    const newPrecio = row.querySelector('td:nth-child(6) input').value.trim();
    const newDescripcion = row.querySelector('td:nth-child(7) textarea').value.trim();

    let erroresValidaciones = validaciones(newMarca, newModelo, newAño, newKilometros, newPrecio, newDescripcion);
    if(erroresValidaciones.length > 0){
        mostrarErrores(erroresValidaciones);
        return;
    }
    errorElement.innerHTML = '';

    fetch(`${API_URL}?id=${id}&metodo=actualizar`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({newMarca, newModelo, newAño, newKilometros, newPrecio, newDescripcion})
   }).then(response => response.json())
     .then(result => {
        console.log('Vehículo actualizado', result);
        if(!esEntero(result['affected'])){
            erroresApi = Object.values(result['affected']);
            mostrarErrores(erroresApi);
        }else{
            getVehiculos();
        }
     })
     .catch(error => {
        console.log(error);
        alert('Error al actualizar el vehiculo. Por favor, inténtelo de nuevo.');
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
function deleteVehiculo(id){
    if(confirm('¿Estás seguro de que quieres eliminar este vehiculo?')){
       fetch(`${API_URL}?id=${id}&metodo=eliminar`, {
            method: 'POST',
       })
       .then(response => response.json())
       .then(result => {
            console.log('vehiculo eliminado: ', result);
            getVehiculos();
       })
       .catch(error => console.error('Error: ', error));
    }
}

document.getElementById('createForm').addEventListener('submit', createVehiculo);

getVehiculos();