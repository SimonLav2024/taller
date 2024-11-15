<?php
include_once "data_log/usuariobd.php";

$usuariobd = new UsuarioBD();

// verificar si se ha proporcionado un token
if(isset($_GET['token'])){
    $token = $_GET['token'];

    if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['nueva_password'])){
        $resultado = $usuariobd->restablecerPassword($token, $_POST['nueva_password']);
        $mensaje = $resultado['message'];
    }
}else{
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles_log.css?v=2.0.0">
    <title>Restablecer Contraseña</title>
</head>
<body>
    <div class="container">
        <h1>Restablecer Contraseña</h1>
        <?php if (!empty($mensaje)): ?>
            <p class="mensaje"><?php echo $mensaje; ?></p>
            <?php if ($resultado['success']): ?>
                <a href="index_log.php" class="boton">Ir a Iniciar Sesión</a>
            <?php endif; ?>
        <?php else: ?>
            <form method="post">
                <input type="password" name="nueva_password" required placeholder="Nueva contraseña">
                <input type="password" name="confirmar_password" required placeholder="Confirmar nueva contraseña">
                <input type="submit" value="Restablecer Contraseña">
            </form>
        <?php endif; ?>
    </div>
    
    <script src="js_log/restablecer.js?v=2.0.0"></script>
</body>
</html>