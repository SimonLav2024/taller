<?php 

require_once "database.php";

class Coches {
    private Database $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getAll() {
        $result = $this->db->query(sql: "SELECT id, marca, modelo, año, kilometros, precio, descripcion, img FROM coches;");
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
