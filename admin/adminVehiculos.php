<?php
session_start();
require_once "comp_sesion_iniciada.php";
    require_login();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Vehículos</title>
    <link rel="stylesheet" href="../css/styles_admin.css">
</head>
<body>
    <h1>Administración de Stock de Vehículos</h1>
    <h2>Añadir Vehículo</h2>
    <!-- enctype="multipart/form-data" eso hay que ponerlo en form para que se puedan subir imagenes a la base de datos -->
    <form id="createForm">
        <input type="text" id="createMarca" placeholder="Marca" required>
        <input type="text" id="createModelo"  placeholder="Modelo" required>
        <input type="text" id="createAño" placeholder="Año">
        <input type="text" id="createKilometros"  placeholder="Kilometros">
        <input type="text" id="createPrecio"  placeholder="Precio">
        <textarea id="createDescripcion" placeholder="Descripción"></textarea>
        <button type="submit">Añadir Vehículo</button>
        <div id="createError" class="error"></div>
    </form>

    <h2>Directores</h2>
    <table id="vehiculosTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Kilómetros</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <script src="js_admin/adminVehiculos.js"></script>
</body>
</html>