<?php
require_once "config.php";

class Database{
    private $conn;

    public function __construct() {
        $this->conn = new mysqli(hostname: DB_HOST, username: DB_USER, password: DB_PASS, database: DB_NAME);
        if($this->conn->connect_error) {
            die("Error de conexión con la base de datos: ". $this->conn->connect_error);
        }
    }

    public function query($sql, $params = []) {
        $statement = $this->conn->prepare($sql);
        if($statement === false) {
            die("Error en la preparación: ". $this->conn->error);
        }
        if(!empty($params)) {
            $types = str_repeat("s", count($params));
            $statement->bind_param($types, ...$params);
        }
        $statement->execute();
        return $statement->get_result();
    }
    public function close() {
        $this->conn->close();
    }
}