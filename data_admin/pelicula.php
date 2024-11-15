<?php

require_once "database.php";
require_once "validatorPelicula.php";
require_once "validatorException.php";

class Pelicula {
    private Database $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getAll() {
        $result = $this->db->query(sql: "SELECT id, titulo, precio, id_director, imagen FROM pelicula;");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getById($id): mixed {
        $result = $this->db->query(sql: "SELECT id, titulo, precio, id_director FROM pelicula WHERE id = ?", params: [$id]);
        return $result->fetch_assoc();
    }

    public function createPelicula($titulo, $precio, $id_director) {
        $data = ['titulo' => $titulo, 'precio' => $precio, "id_director" => $id_director];
        $dataSaneados = ValidatorPelicula::sanear($data);
        $errors = ValidatorPelicula::validar($dataSaneados);

        if(!empty($errors)){
            $errores = new ValidatorException($errors);
            return $errores->getErrors();
        }

        $tituloSaneado = $dataSaneados['titulo'];
        $precioSaneado = $dataSaneados['precio'];
        $id_directorSaneado = $dataSaneados["id_director"];

        $result = $this->db->query("SELECT id FROM pelicula WHERE titulo LIKE ?", [$tituloSaneado]);
        if ($result->num_rows === $tituloSaneado) {
            return "El titulo de la pelicula no puede ser el mismo";
        }
        $result = $this->db->query("SELECT id FROM director WHERE id = ?", [$id_directorSaneado]);
        if ($result->num_rows === 0 ) {
            return "Debe existir un director de la pelicula";
        }

        //lanzamos la consulta
        $this->db->query("INSERT INTO pelicula (titulo, precio, id_director) VALUES(?, ?, ?)", [$tituloSaneado, $precioSaneado, $id_directorSaneado]);

        return $this->db->query("SELECT LAST_INSERT_ID() as id")->fetch_assoc()['id'];
    }

    public function update(int $id, $titulo, $precio, $id_director) {
        $data = ["id" => $id, 'titulo' => $titulo, 'precio' => $precio, "id_director" => $id_director];
        $dataSaneados = ValidatorPelicula::sanear($data);
        $errors = ValidatorPelicula::validar($dataSaneados);

        if(!empty($errors)){
            $errores = new ValidatorException($errors);
            return $errores->getErrors();
        }

        $idSaneado = $dataSaneados["id"];
        $tituloSaneado = $dataSaneados['titulo'];
        $precioSaneado = $dataSaneados['precio'];
        $id_directorSaneado = $dataSaneados["id_director"];
        $result = $this->db->query("SELECT id FROM director WHERE id = ?", [$id_directorSaneado]);
        if ($result->num_rows === 0 ) {
            return "Debe existir un director de la pelicula";
        }

        $this->db->query("UPDATE pelicula SET titulo = ?, precio = ?, id_director = ? WHERE id = ?", [$tituloSaneado, $precioSaneado, $id_directorSaneado, $idSaneado]);
        return $this->db->query("SELECT ROW_COUNT() AS affected")->fetch_assoc()["affected"];
       
    }

    public function delete(int $id) {
        $this->db->query("DELETE FROM pelicula WHERE id = ?", [$id]);
        return $this->db->query("SELECT ROW_COUNT() AS affected")->fetch_assoc()["affected"];
    }
}