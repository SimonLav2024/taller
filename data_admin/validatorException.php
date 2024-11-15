<?php


class ValidatorException extends Exception {
    protected $errors;

    public function __construct($errors) {
        $this->errors = $errors;
        parent::__construct(message: "Error de validación");
    }

    public function getErrors() {
        return $this->errors;
    }
}