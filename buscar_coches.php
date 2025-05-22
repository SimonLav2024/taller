<?php
header('Content-Type: application/json');

try {
    $conexion = new PDO("mysql:host=localhost;dbname=cochesbd", "root", "");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $busqueda = isset($_GET['query']) ? '%' . $_GET['query'] . '%' : '';
    
    $query = "SELECT * FROM coches WHERE 
              marca LIKE :busqueda OR 
              modelo LIKE :busqueda 
              LIMIT 12";
              
    $stmt = $conexion->prepare($query);
    $stmt->bindParam(':busqueda', $busqueda, PDO::PARAM_STR);
    $stmt->execute();
    
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'data' => $resultados]);
    
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $e->getMessage()]);
}
?> 