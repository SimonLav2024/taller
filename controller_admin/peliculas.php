<?php

require_once "../data/pelicula.php";
require_once "utilidades.php";

header("Content-Type: application/json");

$pelicula = new Pelicula();

$method = $_SERVER['REQUEST_METHOD'];

$parametros = Utilidades::parseUriParameters($_SERVER['REQUEST_URI']);
$id = Utilidades::getParameterValue($parametros, 'id');
$metodo = Utilidades::getParameterValue($parametros, "metodo");

switch ($method) {
    case "GET":
    if($id) {
        $respuesta = getPeliculaById($pelicula, $id, $id_director);
    }else{
        $respuesta = getAllPeliculas($pelicula);
    }
    print json_encode($respuesta);
    break;
    case 'POST':
        if($metodo == 'crear'){
          setPelicula($pelicula);
        }
        if($metodo == 'actualizar'){
          if($id){
            updatePelicula($pelicula, $id);
          }else{
            http_response_code(400);
            echo json_encode(['error' => 'ID no proporcionado']);
          }
        }
        if($metodo == 'eliminar'){
          if($id){
            deletePelicula($pelicula, $id);
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

function getAllPeliculas($pelicula) {
    return $pelicula->getAll();
}

function getPeliculaById($pelicula, $id, $id_director) {
    return $pelicula->getById($id);
}

function setPelicula($pelicula) {
    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data["titulo"]) && isset($data["titulo"])) {
        $id = $pelicula->createPelicula($data["titulo"], $data["precio"], $data["id_director"]);
        print json_encode(["id" => $id]);
    }else{
        print json_encode(["Error" => "Datos insuficientes o no son válidos"]);
    }
}

function updatePelicula($pelicula, $id) {
    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data["titulo"]) && isset($data["precio"]) && isset($data["id_director"])) {
        $affected = $pelicula->update($id, $data["titulo"], $data["precio"], $data["id_director"]);
        print json_encode(["affected" => $affected]);
    }else{
        print json_encode(["Error" => "Datos insuficientes o no son válidos"]);
    }
}
function deletePelicula($pelicula, $id) {
    $affected = $pelicula->delete( $id );
    print json_encode(["affected" => $affected]);
}
