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
        .logout-link {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          background-color: #ff4757;
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-family: Arial, sans-serif;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .logout-text {
          margin-right: 8px;
        }
        .logout-icon {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }
        .logout-link:hover {
          background-color: #ff6b81;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .logout-link:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    <a href="logout.php" class="logout-link">
  <span class="logout-text">Cerrar sesión</span>
  <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="none" d="M0 0h24v24H0z"/>
    <path d="M5 5h7V3H3v18h9v-2H5z M21 12l-4-4v3H9v2h8v3z"/>
  </svg>
</a>
</body>
</html>