
<?php

// almacenar y persistir los datos del usuario mientras navega por un sitio web con las distintas paginas de ese sitio hasta que se cierre sesion o se cierre el navegador
// los datos de la sesion se guardan en el servidor, el navegador tb guarda los datos para mantener la sesion iniciada
// hay que utilizar la funcion session_start() en todos los archivos donde se quiera utilizar $_SESSION
session_start();
function is_logged_in() {
    return isset($_SESSION["user"]);
}

function require_login() {
    if (!is_logged_in()) {
        header("Location: index.php");
    }
}
