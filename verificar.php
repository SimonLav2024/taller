<?php
require_once "data_log/usuariobd.php";

$usuarioBD = new UsuarioBD();

// comprobamos si se ha recibido un token
if(isset($_GET['token'])){
    $token = $_GET['token'];
    $resultado = $usuarioBD->verificarToken($token);
    $mensaje = $resultado['message'];
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles_log.css">
    <title>Verificación de Cuenta</title>
</head>
<body>
    <div class="container">
        <h1>Verificación de Cuenta</h1>
        <p class="mensaje"><?php echo $mensaje; ?></p>
        <a href="index_log.php" class="boton">Ir a Iniciar Sesion</a>
    </div>
</body>
</html>