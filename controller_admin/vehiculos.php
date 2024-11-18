<?php

require_once '../data_admin/coches.php';
require_once 'utilidades.php';

header('Content-Type: application/json');

$vehiculo = new Coches();

$method = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];

$parametros = Utilidades::parseUriParameters($uri);
$id = Utilidades::getParameterValue($parametros, 'id');
$metodo = Utilidades::getParameterValue($parametros, "metodo");

switch($method){
    case 'GET':
        if($id){
            $respuesta = getVehiculoById($vehiculo, $id);
        }else{
            $respuesta = getAllVehiculos($vehiculo);
        }
        echo json_encode($respuesta);
        break;
        case 'POST':
          if($metodo == 'crear'){
            setVehiculo($vehiculo);
          }
          if($metodo == 'actualizar'){
            if($id){
              updateVehiculo($vehiculo, $id);
            }else{
              http_response_code(400);
              echo json_encode(['error' => 'ID no proporcionado']);
            }
          }
          if($metodo == 'eliminar'){
            if($id){
              deleteVehiculo($vehiculo, $id);
            }else{
              http_response_code(400);
              echo json_encode(['error' => 'ID no proporcionado']);
            }
          }
            break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
  }

  function getVehiculoById($vehiculo, $id){
    return $vehiculo->getById($id);
  }

  function getAllVehiculos($vehiculo){
    return $vehiculo->getAll();
  }

  function setVehiculo($vehiculo){
    $data = json_decode(file_get_contents('php://input'), true);
    $año = null;
    $descripcion = null;
    if(isset($data['año'])){
        $año = $data['año'];
    }
    if(isset($data['descripcion'])){
        $descripcion = $data['descripcion'];
    }
    if(isset($data['marca']) && isset($data['modelo']) && isset($data['kilometros']) && isset($data['precio'])){
      $id = $vehiculo->create($data['marca'], $data['modelo'], $año, $data['kilometros'], $data['precio'], $descripcion);
      echo json_encode(['id' => $id]);
    }else{
      echo json_encode(['Error' => 'Datos insuficientes']);
    }
  }

  function updateVehiculo($vehiculo, $id){
    $data = json_decode(file_get_contents('php://input'), true);
    $año = null;
    $descripcion = null;
    if(isset($data['año'])){
        $año = $data['año'];
    }
    if(isset($data['descripcion'])){
        $descripcion = $data['descripcion'];
    }
    if(isset($data['marca']) && isset($data['modelo']) && isset($data['kilometros']) && isset($data['precio'])){
      $id = $vehiculo->create($data['marca'], $data['modelo'], $año, $data['kilometros'], $data['precio'], $descripcion);
      echo json_encode(['id' => $id]);
    }else{
      echo json_encode(['Error' => 'Datos insuficientes']);
    }
  }

  function deleteVehiculo($vehiculo, $id)
{
    $affected = $vehiculo->delete($id);
    echo json_encode(['affected' => $affected]);
}