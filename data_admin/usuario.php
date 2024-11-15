<?php
require_once "database.php";
require_once "validator.php";
require_once "validatorException.php";

class Usuario {
    private Database $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getAll() {
        $result = $this->db->query(sql: "SELECT id, nombre, email FROM usuario;");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getById($id): mixed {
        $result = $this->db->query(sql: "SELECT id, nombre, email FROM usuario WHERE id = ?", params: [$id]);
        return $result->fetch_assoc();
    }

    public function createUsuario($nombre, $email) {
        $data = ['nombre' => $nombre, 'email' => $email];
        $dataSaneados = Validator::sanear($data);
        $errors = Validator::validar($dataSaneados);
        
        if(!empty($errors)){
            $erroresString ="";
            if(isset($errors["nombre"])){
                $erroresString .= $errors["nombre"];
            }
            if(isset($errors["email"])){
                $erroresString .= $errors["email"];
            }
            return $erroresString;
        }
        if(!empty($errors)){
            $errores = new ValidatorException($errors);
            return $errores->getErrors();
        }
        $nombreSaneado = $dataSaneados['nombre'];
        $emailSaneado = $dataSaneados['email'];

        $result = $this->db->query("SELECT id FROM usuario WHERE email = ?", [$emailSaneado]);
        if ($result->num_rows > 0) {
            return "El email ya existe";
        }

        //lanzamos la consulta
        $this->db->query("INSERT INTO usuario (nombre, email) VALUES(?, ?)", [$nombreSaneado, $emailSaneado]);

        return $this->db->query("SELECT LAST_INSERT_ID() as id")->fetch_assoc()['id'];
    }

    public function update(int $id, $nombre, $email) {
        $this->db->query("UPDATE usuario SET nombre = ?, email = ? WHERE id = ?", [$nombre, $email, $id]);
        return $this->db->query("SELECT ROW_COUNT() AS affected")->fetch_assoc()["affected"];
    }

    public function delete(int $id) {
        $this->db->query("DELETE FROM usuario WHERE id = ?", [$id]);
        return $this->db->query("SELECT ROW_COUNT() AS affected")->fetch_assoc()["affected"];
    }
}
