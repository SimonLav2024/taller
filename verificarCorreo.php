<?php

include_once "enviarCorreo.php";
include_once "config.php";


$cuerpo = "Solicitud de cita previa de: " . $_POST["nombre"] . "\n";
$cuerpo .= "Nombre: " . $_POST["nombre"] . "\n";
$cuerpo .= "Telefono: " . $_POST["telefono"] . "\n";
$cuerpo .= "Mensaje: " . $_POST["mensaje"];

Correo::enviarCorreo($_POST["correo"], $_POST["nombre"], "Solicitud de cita previa con Talleres Moyano", "Ha solicitado cita con Talleres Moyano, nos pondremos en contacto con usted para confirmar la cita lo antes posible. Gracias por confiar en Talleres Moyano.");
Correo::enviarCorreo(MAIL_USER, "Talleres Moyano Admin", $_POST["Cita Previa"], $cuerpo);

    header("Location: index.php");
    exit();
