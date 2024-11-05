<?php

require_once "../data/piezas.php";
require_once "utilidades.php";

header("Content-Type: application/json");

$pieza = new Piezas();

$method = $_SERVER['REQUEST_METHOD'];

$parametros = Utilidades::parseUriParameters($_SERVER['REQUEST_URI']);
$id = Utilidades::getParameterValue($parametros, 'id');
$metodo = Utilidades::getParameterValue($parametros, "metodo");

 if($method === "GET") {
        $respuesta = $pieza->getAll();
        print json_encode($respuesta);
    }