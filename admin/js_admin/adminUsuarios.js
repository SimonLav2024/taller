
const API_URL = "http://localhost/super_pelis/controller/usuarios.php";

function limpiarHTML(str){
    return str.replace(/[^\w. @-]/gi, function(e) {
        return "&#" + e.charCodeAt(0) + ";";
    });
}

function validarEmail(email) {
    return email;
}
function validarNombre(nombre) {
    return nombre.length >= 2 && nombre.length <= 50;
}
function esEntero(str) {
    return /^\d+$/.test(str);
}
function getUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            const tableBody = document.querySelector("#usersTable tbody");
            tableBody.innerHTML = "";
            users.forEach(user => {
                const NombreSaneado = limpiarHTML(user.nombre);
                const EmailSaneado = limpiarHTML(user.email);
                tableBody.innerHTML += `
                    <tr data-id="${user.id}">
                        <td>
                            ${user.id}
                        </td>
                        <td>
                            <span class="listado">${NombreSaneado}</span>
                            <input class="edicion" type="text" value="${NombreSaneado}">
                        </td>
                        <td>
                            <span class="listado">${EmailSaneado}</span>
                            <input class="edicion" type="email" value="${EmailSaneado}">
                        </td>
                        <td class="btn">
                            <button class="listado" onclick="editMode(${user.id})">Editar</button>
                            <button class="listado" onclick="deleteUser(${user.id})">Eliminar</button>
                            <button class="edicion" onclick="updateUser(${user.id})">Guardar</button>
                            <button class="edicion" onclick="cancelEdit(${user.id})">Cancelar</button>
                        </td>
                    </tr>
                `
            });
        })
        .catch(error => console.log("Error:", error));
}

function createUser(event) {
    event.preventDefault();
    const nombre = document.getElementById("createNombre").value.trim();
    const email = document.getElementById("createEmail").value.trim();
    const errorElement = document.getElementById("createError");

    if(!validarNombre(nombre)){
        errorElement.textContent = "El nombre de usuario debe tener entre 2 y 50 caracteres.";
        return;
    }
    if(!validarEmail(email)){
        errorElement.textContent = "El Email no es válido.";
        return;
    }
     errorElement.textContent = "";

    //  envio de los datos al controlador
     fetch(`${API_URL}?metodo=crear`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({nombre, email})
     })
     .then(response => response.json())
     .then(result => {
        console.log(result["id"]);
        if(!esEntero(result["id"])){
            errorElement.textContent = result["id"];
        }
        getUsers();
        event.target.reset();
     })
     .catch(error => {
        console.log("Error: ", JSON.stringify(error));
    })
}

function updateUser(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const newNombre = row.querySelector('td:nth-child(2) input').value.trim();
    const newEmail = row.querySelector('td:nth-child(3) input').value.trim();
    
    if(!validarNombre(newNombre)){
        alert("El nombre debe tener entre 2 y 50 caracteres.");
        return;
    }

    if(!validarEmail(newEmail)){
        alert('El email no es válido.');
        return;
    }

    fetch(`${API_URL}?id=${id}&metodo=actualizar`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({nombre: newNombre, email: newEmail})
   }).then(response => response.json())
     .then(result => {
        console.log('Usuario actualizado', result);
        if(!esEntero(result['affected'])){
            errorElement.innerHTML = result['affected'];
        }else{
            getUsers();
        }
     })
     .catch(error => {
        alert('Error al actualizar al usuario. Por favor, inténtelo de nuevo.');
     });
}

function mostrarErrores(errores){
    arrayErrores = Object.values(errores);
    errorElement.innerHTML = '<ul>';
    arrayErrores.forEach(error => {
        return errorElement.innerHTML += `<li>${error}</li>`;
    });
    errorElement.innerHTML += '</ul>';
}

function editMode(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.querySelectorAll('.edicion').forEach(ro => {
        ro.style.display = 'inline-block';
    })
    row.querySelectorAll('.listado').forEach(ro => {
        ro.style.display = 'none';
    })
}
function cancelEdit(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.querySelectorAll('.edicion').forEach(ro => {
        ro.style.display = 'none';
    })
    row.querySelectorAll('.listado').forEach(ro => {
        ro.style.display = 'inline-block';
    })
}

function deleteUser(id) {
    if(confirm("¿Estás seguro de que quieres eliminar este usuario?")){
        fetch(`${API_URL}?id=${id}&metodo=eliminar`, {
            method: "POST",
        })
        .then(response => response.json())
        .then(result => {
            console.log("usuario aliminado: ", result)
            getUsers();
        })
        .catch(error => console.error("Error: ", error));
    }
}

document.getElementById("createFrom").addEventListener("submit", createUser);

getUsers();
