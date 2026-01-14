<?php
require_once '../config.php';

header('Content-Type: application/json');

if (!isset($_GET['lat']) || !isset($_GET['lon'])) {
    echo json_encode(['error' => 'Latitude and longitude are required']);
    exit;
}

$lat = floatval($_GET['lat']);
$lon = floatval($_GET['lon']);
$units = isset($_GET['units']) ? $_GET['units'] : 'metric';

$url = BASE_URL . "/weather?lat={$lat}&lon={$lon}&units={$units}&appid=" . OWM_API_KEY;

try {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if (curl_errno($ch)) {
        throw new Exception("cURL Error: " . curl_error($ch));
    }
    
    curl_close($ch);
    
    if ($httpCode !== 200) {
        $errorData = json_decode($response, true);
        $errorMsg = $errorData['message'] ?? 'Unknown error';
        throw new Exception("API Error ({$httpCode}): {$errorMsg}");
    }
    
    $data = json_decode($response, true);
    
    echo json_encode([
        'success' => true,
        'data' => $data
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>