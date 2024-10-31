<?php

include_once "enviarCorreo.php";
include_once "config.php";


$cuerpo = "solicitud de cita previa de: " . "\n";
$cuerpo .= "Nombre: " . $_POST["nombre"] . "\n";
$cuerpo .= "Telefono: " . $_POST["telefono"] . "\n";
$cuerpo .= "Mensaje: " . $_POST["mensaje"];

Correo::enviarCorreo($_POST["correo"], "Talleres Moyano", "Cita confirmada", "Confirmada la cita con Talleres Moyano");
Correo::enviarCorreo(MAIL_USER, $_POST["nombre"], $_POST["Cita Previa"], $cuerpo);

    header("Location: index.php");
    exit();
