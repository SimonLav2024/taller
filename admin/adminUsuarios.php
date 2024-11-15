<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Gestión de usuarios</title>
</head>
<body>
    <h1>Administración de usuarios</h1>
    <h2>Crear Usuario</h2>
    <form id="createFrom">
        <input type="text" id="createNombre" placeholder="Nombre" required>
        <input type="email" id="createEmail" placeholder="Email" required>
        <button type="submit">Crear Usuario</button>
        <div id="createError" class="error"></div>
    </form>

    <h2>Usuarios</h2>
    <table id="usersTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <script src="JS/adminUsuarios.js"></script>
</body>
</html>