<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Repuestos</title>
    <link rel="stylesheet" href="../css/styles_admin.css">
</head>
<body>
    <h1>Administración de Stock de Repuestos</h1>
    <h2>Añadir Repuesto</h2>
    <form id="createForm">
        <input type="text" id="createNombre" placeholder="Nombre" required>
        <input type="text" id="createPrecio"  placeholder="Precio" required>
        <input type="text" id="createMarca"  placeholder="Marca de la pieza" required>
        <input type="text" id="createCompatibilidad"  placeholder="Compatibilidad con vehículos" required>
        <button type="submit">Añadir repuesto</button>
        <div id="createError" class="error"></div>
    </form>

    <h2>Piezas</h2>
    <table id="piezasTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Marca</th>
                <th>Coches compatibles</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <script src="js_admin/adminRepuestos.js"></script>
</body>
</html>