<?php

include_once "enviarCorreo.php";
include_once "config.php";

if(isset($_POST["nombre"]) && isset($_POST["telefono"]) && isset($_POST["correo"]) && isset($_POST["mensaje"])) {

    $cuerpo = "Solicitud de cita previa de: " . $_POST["nombre"] . "\n";
    $cuerpo .= "Nombre: " . $_POST["nombre"] . "\n";
    $cuerpo .= "Telefono: " . $_POST["telefono"] . "\n";
    $cuerpo .= "Mensaje: " . $_POST["mensaje"];
    
    Correo::enviarCorreo($_POST["correo"], $_POST["nombre"], "Solicitud de cita previa con Talleres Moyano", "Ha solicitado cita con Talleres Moyano, nos pondremos en contacto con usted para confirmar la cita lo antes posible. Gracias por confiar en Talleres Moyano.");
    Correo::enviarCorreo(MAIL_USER, "Talleres Moyano Admin", $_POST["Cita Previa"], $cuerpo);
    
    if($_POST["formulario"] === "taller") {
        header("Location: index.php");
        exit();
    }
    
    if($_POST["formulario"] === "tienda") {
        header("Location: tienda.html");
        exit();
    }
    
    if($_POST["formulario"] === "repuestos") {
        header("Location: repuestos.html");
        exit();
    }
}

header("Location: index.php");
exit();

    
