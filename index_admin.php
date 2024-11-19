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
    <title>Adminstración Talleres Moyano</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
            font-family: 'Arial', sans-serif;
        }
        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 20px;
        }
        .box {
            width: 300px;
            height: 200px;
            background: white;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: #333;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            text-align: center;
            padding: 20px;
        }
        .box:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        .box h2 {
            margin-bottom: 10px;
            color: #f6d365;
        }
        .box p {
            color: #888;
            font-size: 0.9em;
        }
        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }
            .box {
                width: 100%;
                max-width: 350px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="http://localhost/Proyecto-Definitivo/admin/adminVehiculos.php" class="box" target="_blank">
            <h2>Adminstración de Vehículos</h2>
            <p>Administración de vehículos para poder añadir o eliminar vehículos del stock</p>
        </a>
        <a href="http://localhost/Proyecto-Definitivo/admin/adminRepuestos.php" class="box" target="_blank">
            <h2>Administración de Repuestos</h2>
            <p>Administración de repuestos que sirve para poder añadir nuevos repuestos o para borrar los antiguos en caso necesario</p>
        </a>
    </div>
</body>
</html>