<?php

$errores = [];

if($_SERVER["REQUEST_METHOD"] === "POST"){
    // print "<pre>";
    // var_dump($_POST);
    // print "</pre>";

    if(empty($_POST["nombre"])){
        $errores[] = "El nombre es obligatorio";
    }

    if(empty($_POST["correo"])){
        $errores[] = "El correo electrónico es obligatorio";
    }else if(!filter_var($_POST["correo"], FILTER_VALIDATE_EMAIL)){
        $errores[] = "El formato del correo no es valido";
    }

    if(empty($errores)){
        print "<h2>Datos del formulario</h2>";
        print "<p><b>Nombre: </b>" . htmlspecialchars($_POST["nombre"]) . "</p>";
        print "<p><b>Correo electrónico: </b>" . htmlspecialchars($_POST["correo"]) . "</p>";
    }else{
        print "Errores en el formulario";
        print "<ul>";
        foreach($errores as $error){
            print "<li>". $error ."</li>";
        }
        print "</ul>";
        print "<p><a href='JavaScript/code:history.back()'>Volver la Formulario</a></p>";
    }
}else{
    header("Location: index.php");
    exit();
}
