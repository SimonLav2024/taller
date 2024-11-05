<?php

require_once "../data/coches.php";
require_once "utilidades.php";

header("Content-Type: application/json");

$coche = new Coches();

$method = $_SERVER['REQUEST_METHOD'];

$parametros = Utilidades::parseUriParameters($_SERVER['REQUEST_URI']);
$id = Utilidades::getParameterValue($parametros, 'id');
$metodo = Utilidades::getParameterValue($parametros, "metodo");

 if($method === "GET") {
        $respuesta = $coche->getAll();
        print json_encode($respuesta);
    }

