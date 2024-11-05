<?php 

require_once "database.php";

class Piezas {
    private Database $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getAll() {
        $result = $this->db->query(sql: "SELECT id, img, nombre, precio, marca_pieza, coche_compatible FROM piezas;");
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}