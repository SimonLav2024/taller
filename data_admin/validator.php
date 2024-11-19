<?php

class Validator {
    public static function sanear($datos): array {
        $saneados = [];
        foreach ($datos as $key => $value) {
            $saneados[$key] = htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES,"UTF-8");
        }
        return $saneados;
    }

    public static function validarPieza($data){
        $errors = [];

        if(!isset($data['nombre']) || empty(trim($data['nombre']))){
            $errors['nombre'] = "El nombre es necesario";
        }elseif(strlen($data['nombre']) < 2 || strlen($data['nombre']) > 50){
            $errors['nombre'] = "El nombre debe tener entre 2 y 50 caracteres";
        }

        if(!isset($data['precio']) || empty(trim($data['precio']))){
            $errors['precio'] = "El precio es necesario";
        }elseif($data['precio'] < 0){
            $errors['precio'] = "El precio debe ser mayor o igual a 0";
        }

        if(!isset($data['marca_pieza']) || empty(trim($data['marca_pieza']))){
            $errors['marca_pieza'] = "El la marca de la pieza es necesaria";
        }

        return $errors;
    }

    public static function esFormatoFecha($string, $formato = 'Y-m-d') {
        $fecha = DateTime::createFromFormat($formato, $string);
        return $fecha && $fecha->format($formato) === $string;
    }

    public static function esFechaAnteriorHoy($fecha){
        $hoy = new DateTime();
        $fechaAComprobar = new DateTime($fecha);
        return $fechaAComprobar > $hoy;
    }

    public static function validarVehiculo($data){
        $errors = [];

        if(!isset($data['marca']) || empty(trim($data['marca']))){
            $errors['marca'] = "La marca es necesaria";
        }elseif(strlen($data['marca']) < 2 || strlen($data['marca']) > 50){
            $errors['marca'] = "La marca debe tener entre 2 y 50 caracteres";
        }

        if(!isset($data['modelo']) || empty(trim($data['modelo']))){
            $errors['modelo'] = "El modelo es necesario";
        }elseif(strlen($data['modelo']) < 2 || strlen($data['modelo']) > 50){
            $errors['modelo'] = "El modelo debe tener entre 2 y 50 caracteres";
        }

        if(!isset($data['año']) || empty(trim($data['año']))){
            $errors['año'] = "El año es necesario";
        }elseif(strlen($data['año']) < 2 || strlen($data['año']) > 50){
            $errors['año'] = "El año debe tener entre 2 y 50 caracteres";
        }

        if(!isset($data['kilometros']) || empty(trim($data['kilometros']))){
            $errors['kilometros'] = "Los kilometros son necesario";
        }elseif(strlen($data['kilometros']) < 2 || strlen($data['kilometros']) > 50){
            $errors['kilometros'] = "Los kilometros deben ser entre 2 y 50 caracteres";
        }

        if(!isset($data['precio']) || empty(trim($data['precio']))){
            $errors['precio'] = "El precio es necesario";
        }elseif(strlen($data['precio']) < 2 || strlen($data['precio']) > 50){
            $errors['precio'] = "El precio debe ser entre 2 y 50 caracteres";
        }

        if(isset($data['descripcion']) && strlen($data['descripcion']) > 65500){
            $errors['descripcion'] = "La descripcion es demasiado extensa";
        }

        return $errors;       
    }
}
