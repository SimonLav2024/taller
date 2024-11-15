<?php
require_once "../data/usuario.php";
require_once "utilidades.php";

/**
 * Establecer el encabezado
 * La respuesta va a ser un obejto tipo JSON
 */

header("Content-Type: application/json");

$usuario = new Usuario();

/**
 * La variable superglobal $_SERVER["REQUEST_METHOD"];
 * el REQUEST_METHOD puede ser: 
 * - GET    que sirve para solicitar datos del servidor
 * - POST   sirve para enviar datos al servidor
 * - PUT    sirve para actualizar datos existentes
 * - DELETE sirve para eliminar datos
 */

$method = $_SERVER['REQUEST_METHOD'];

/**
 * $_SERVER["PATH_INFO"] es otra variable superglobal
 * Contiene informacion adicional sobre la ruta de la solicitud actual
 * Ejemplo: si la url es http://ejemplo.com/script.php/usuarios/123
 * $_SERVER["PATH_INFO"] /usuarios/123
 * $_SERVER["SCRIPT_NAME"] /script.php
 */

// if(isset($_SERVER["PATH_INFO"])) {
//     $request = explode("/", trim($_SERVER["PATH_INFO"],"/"));
// }else{
//     $request = [];
// }
$parametros = Utilidades::parseUriParameters($_SERVER['REQUEST_URI']);
$id = Utilidades::getParameterValue($parametros, 'id');
$metodo = Utilidades::getParameterValue($parametros, "metodo");

switch ($method) {
    case "GET":
        if($id) {
            $respuesta = getUsuarioById($usuario, $id);
        }else{
            $respuesta = getAllUsuarios($usuario);
        }
        print json_encode($respuesta);
        break;
        case "POST":
                if($metodo == 'crear'){
                  setUser($usuario);
                }
                if($metodo == 'actualizar'){
                  if($id){
                    updateUser($usuario, $id);
                  }else{
                    http_response_code(400);
                    echo json_encode(['error' => 'ID no proporcionado']);
                  }
                }
                if($metodo == 'eliminar'){
                  if($id){
                    deleteUser($usuario, $id);
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

function getAllUsuarios($usuario) {
    return $usuario->getAll();
}

function getUsuarioById($usuario, $id) {
    return $usuario->getById($id);
}

function setUser($usuario) {
    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data["nombre"]) && isset($data["nombre"])) {
        $id = $usuario->createUsuario($data["nombre"], $data["email"]);
        print json_encode(["id" => $id]);
    }else{
        print json_encode(["Error" => "Datos insuficientes o no son válidos"]);
    }
}

function updateUser($usuario, $id) {
    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data["nombre"]) && isset($data["email"])) {
        $affected = $usuario->update($id, $data["nombre"], $data["email"]);
        print json_encode(["affected" => $affected]);
    }else{
        print json_encode(["Error" => "Datos insuficientes o no son válidos"]);
    }
}
function deleteUser($usuario, $id) {
    // $data = json_decode(file_get_contents("php://input"), true);
    $affected = $usuario->delete( $id );
    print json_encode(["affected" => $affected]);
}