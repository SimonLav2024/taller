<?php

require_once "../data_admin/piezas.php";
require_once "utilidades.php";

header("Content-Type: application/json");

$piezas = new Piezas();

$method = $_SERVER['REQUEST_METHOD'];

$parametros = Utilidades::parseUriParameters($_SERVER['REQUEST_URI']);
$id = Utilidades::getParameterValue($parametros, 'id');
$metodo = Utilidades::getParameterValue($parametros, "metodo");

switch ($method) {
    case "GET":
    if($id) {
        $respuesta = getPiezaById($pieza, $id, $marca_pieza, $coche_compatible);
    }else{
        $respuesta = getAllPiezas($pieza);
    }
    print json_encode($respuesta);
    break;
    case 'POST':
        if($metodo == 'crear'){
          setPieza($pieza);
        }
        if($metodo == 'actualizar'){
          if($id){
            updatePieza($pieza, $id);
          }else{
            http_response_code(400);
            echo json_encode(['error' => 'ID no proporcionado']);
          }
        }
        if($metodo == 'eliminar'){
          if($id){
            deletePieza($pieza, $id);
          }else{
            http_response_code(400);
            echo json_encode(['error' => 'ID no proporcionado']);
          }
        }
          break;
default:
    http_response_code(405);
    print json_encode(["error"=> "Metodo no permitodo"]);
}

function getAllPiezas($pieza) {
    return $pieza->getAll();
}

function getPiezaById($pieza, $id, $marca_pieza, $coche_compatible) {
    return $pieza->getById($id);
}

function setPieza($pieza) {
    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data["nombre"]) && isset($data["nombre"])) {
        $id = $pieza->createPieza($data["nombre"], $data["precio"], $data["marca_pieza"], $data["coche_compatible"]);
        print json_encode(["id" => $id]);
    }else{
        print json_encode(["Error" => "Datos insuficientes o no son válidos"]);
    }
}

function updatePieza($pieza, $id) {
    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data["nombre"]) && isset($data["precio"]) && isset($data["marca_pieza"]) && isset($data["coche_compatible"])) {
        $affected = $pieza->update($id, $data["nombre"], $data["precio"], $data["marca_pieza"], $data["coche_compatible"]);
        print json_encode(["affected" => $affected]);
    }else{
        print json_encode(["Error" => "Datos insuficientes o no son válidos"]);
    }
}
function deletePieza($pieza, $id) {
    $affected = $pieza->delete( $id );
    print json_encode(["affected" => $affected]);
}
