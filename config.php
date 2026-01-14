<?php
// config.php - Add these lines at the TOP
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

define('OWM_API_KEY', '218313239d3921a4f597960dac81177f');
define('BASE_URL', 'https://api.openweathermap.org/data/2.5');
define('GEO_URL', 'https://api.openweathermap.org/geo/1.0');

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
?>