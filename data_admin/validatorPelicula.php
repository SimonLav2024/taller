<?php

class ValidatorPelicula {
    public static function sanear($datos): array {
        $saneados = [];
        foreach ($datos as $key => $value) {
            $saneados[$key] = htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES,"UTF-8");
        }
        return $saneados;
    }

    public static function validar($datos) {
        $errors = [];
        if(!isset($datos["titulo"]) || empty(trim($datos["titulo"]))) {
            $errors["titulo"] = "El titulo es necesario.";
        }elseif(strlen($datos["titulo"]) < 0 || strlen($datos["titulo"]) > 300){
            $errors["titulo"] = "El titulo ha de tener entre 0 y 300 caractéres.";
        }

        if(!isset($datos["precio"]) || empty(trim($datos["precio"]))) {
            $errors["precio"] = "El precio es necesario.";
        }elseif(!filter_var($datos["precio"], FILTER_VALIDATE_FLOAT) || is_float($datos["precio"])){
            $errors["precio"] = "El formato del precio no es valido.";
        }elseif(strlen($datos["precio"]) > 5) {
            $errors["precio"] = "El precio no puede ser mayor de 99999.";
        }

        if(!isset($datos["id_director"]) || empty(trim($datos["id_director"]))) {
            $errors["id_director"] = "El id del director es obligatorio.";
        }elseif(!filter_var($datos["id_director"], FILTER_VALIDATE_INT)) {
            $errors["id_director"] = "El formato del id del director no es válido.";
        }elseif(strlen($datos["id_director"]) == 0) {
            $errors["id_director"] = "El id del director ha de ser definido.";
        }

        return $errors;
    }
}