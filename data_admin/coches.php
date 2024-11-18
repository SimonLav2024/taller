<?php

require_once 'database.php';
require_once 'validator.php';
require_once 'validatorException.php';

class Coches{
    private Database $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getAll(){
        $result = $this->db->query("SELECT id, marca, modelo, año, kilometros, precio, descripcion FROM coches;");
        return $result->fetch_all(MYSQLI_ASSOC);    
    }

    public function getById($id){
        $idSaneado = Validator::sanear([$id]);
        $result = $this->db->query("SELECT id, marca, modelo, año, kilometros, precio, descripcion FROM coches WHERE id = ?", [$idSaneado[0]]);
        return $result->fetch_assoc();
    }

    public function create($marca, $modelo, $año = null, $kilometros, $precio, $descripcion = null){
        $data = ['marca' => $marca, 'modelo' => $modelo, 'año' => $año, "kilometros"=> $kilometros, "precio" => $precio, 'descripcion' => $descripcion];
        $dataSaneados = Validator::sanear($data);
        $errors = Validator::validarVehiculo($dataSaneados);

        if(!empty($errors)){
            return $errors;
        }

        $marcaSaneado = $dataSaneados['marca'];
        $modeloSaneado = $dataSaneados['modelo'];
        $añoSaneado = $dataSaneados['año'];
        $kilometrosSaneado = $dataSaneados['kilometros'];
        $precioSaneado = $dataSaneados['precio'];
        $descripcionSaneado = $dataSaneados['descripcion'];

        //lanzamos la consulta
        $this->db->query("INSERT INTO director (marca, modelo, año, kilometros, precio, descripcion) VALUES(?, ?, ?, ?, ?, ?)", [$marcaSaneado, $modeloSaneado, $añoSaneado, $kilometrosSaneado, $precioSaneado, $descripcionSaneado]);

        return $this->db->query("SELECT LAST_INSERT_ID() as id")->fetch_assoc()['id'];
    }

    public function update($id, $marca, $modelo, $año = null, $kilometros, $precio, $descripcion = null){
        $data = ['id' => $id, 'marca' => $marca, 'modelo' => $modelo, 'año' => $año, "kilometros" => $kilometros, "precio" => $precio, 'descripcion' => $descripcion];
        $dataSaneados = Validator::sanear($data);
        $errors = Validator::validarVehiculo($dataSaneados);

        if(!empty($errors)){
            return $errors;
        }
        $marcaSaneado = $dataSaneados['marca'];
        $modeloSaneado = $dataSaneados['modelo'];
        $añoSaneado = $dataSaneados['año'];
        $descripcionSaneado = $dataSaneados['descripcion'];
        $idSaneado = $dataSaneados['id'];
        $kilometrosSaneado = $dataSaneados['kilometros'];
        $precioSaneado = $dataSaneados['precio'];


        $this->db->query("UPDATE coches SET marca = ?, modelo = ?, año = ?, kilometros = ?, precio = ?, descripcion = ? WHERE id = ?", [$marcaSaneado, $modeloSaneado, $añoSaneado, $kilometrosSaneado, $precioSaneado, $descripcionSaneado, $idSaneado]);
        return $this->db->query("SELECT ROW_COUNT() as affected")->fetch_assoc()['affected'];
    }

    public function delete($id){
        $idSaneado = Validator::sanear([$id]);
        $this->db->query("DELETE FROM coches WHERE id = ?", [$idSaneado[0]]);
        return $this->db->query("SELECT ROW_COUNT() as affected")->fetch_assoc()['affected'];
    }
}