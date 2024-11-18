<?php

require_once "database.php";
require_once "validatorPieza.php";
require_once "validatorException.php";

class Piezas {
    private Database $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getAll() {
        $result = $this->db->query(sql: "SELECT id, nombre, precio, marca_pieza, coche_compatible, img FROM piezas;");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getById($id): mixed {
        $result = $this->db->query(sql: "SELECT id, nombre, precio, marca_pieza, coche_compatible, img FROM piezas WHERE id = ?", params: [$id]);
        return $result->fetch_assoc();
    }

    public function createPieza($nombre, $precio, $marca_pieza, $coche_compatible) {
        $data = ['nombre' => $nombre, 'precio' => $precio, "marca_pieza" => $marca_pieza, "coche_compatible" => $coche_compatible];
        $dataSaneados = ValidatorPieza::sanear($data);
        $errors = ValidatorPieza::validar($dataSaneados);

        if(!empty($errors)){
            $errores = new ValidatorException($errors);
            return $errores->getErrors();
        }

        $nombreSaneado = $dataSaneados['nombre'];
        $precioSaneado = $dataSaneados['precio'];
        $marca_piezaSaneado = $dataSaneados["marca_pieza"];
        $coche_compatibleSaneado = $dataSaneados["coche_compatible"];

        $result = $this->db->query("SELECT id FROM piezas WHERE nombre LIKE ?", [$nombreSaneado]);
        if ($result->num_rows === $nombreSaneado) {
            return "El nombre de la pieza no puede ser ese, cambia algo para solucionarlo.";
        }
        $result = $this->db->query("SELECT id FROM pieza WHERE id = ?", [$marca_piezaSaneado]);
        if ($result->num_rows === 0 ) {
            return "Algo pasa con la compatibilidad de la pieza.";
        }

        //lanzamos la consulta
        $this->db->query("INSERT INTO pieza (nombre, precio, marca_pieza, coche_compatible) VALUES(?, ?, ?, ?)", [$nombreSaneado, $precioSaneado, $marca_piezaSaneado, $coche_compatibleSaneado]);

        return $this->db->query("SELECT LAST_INSERT_ID() as id")->fetch_assoc()['id'];
    }

    public function update(int $id, $nombre, $precio, $marca_pieza, $coche_compatible) {
        $data = ["id" => $id, 'nombre' => $nombre, 'precio' => $precio, "marca_pieza" => $marca_pieza, "coche_compatible" => $coche_compatible];
        $dataSaneados = ValidatorPieza::sanear($data);
        $errors = ValidatorPieza::validar($dataSaneados);

        if(!empty($errors)){
            $errores = new ValidatorException($errors);
            return $errores->getErrors();
        }

        $idSaneado = $dataSaneados["id"];
        $nombreSaneado = $dataSaneados['nombre'];
        $precioSaneado = $dataSaneados['precio'];
        $marca_piezaSaneado = $dataSaneados["marca_pieza"];
        $coche_compatibleSaneado = $dataSaneados["coche_compatible"];
        $result = $this->db->query("SELECT id FROM pieza WHERE id = ?", [$marca_piezaSaneado]);
        if ($result->num_rows === 0 ) {
            return "Algo pasa con la compatibilidad de la pieza.";
        }

        $this->db->query("UPDATE piezas SET nombre = ?, precio = ?, marca_pieza = ? coche_compatible = ? WHERE id = ?", [$nombreSaneado, $precioSaneado, $marca_piezaSaneado, $coche_compatibleSaneado, $idSaneado]);
        return $this->db->query("SELECT ROW_COUNT() AS affected")->fetch_assoc()["affected"];
       
    }

    public function delete(int $id) {
        $this->db->query("DELETE FROM piezas WHERE id = ?", [$id]);
        return $this->db->query("SELECT ROW_COUNT() AS affected")->fetch_assoc()["affected"];
    }
}