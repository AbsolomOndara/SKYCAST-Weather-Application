<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyCast | Premium Weather App</title>
    <!-- Replace all CSS/JS links with these: -->
<link rel="stylesheet" href="/skycast/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

<!-- Update script tags: -->
<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script src="/skycast/js/app.js"></script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="app-header">
            <h1><i class="fas fa-cloud-sun"></i> SkyCast</h1>
            <div class="theme-toggle">
                <i class="fas fa-moon"></i>
                <label class="switch">
                    <input type="checkbox" id="theme-switch">
                    <span class="slider"></span>
                </label>
                <i class="fas fa-sun"></i>
            </div>
        </header>

        <!-- Search Section -->
        <div class="search-section">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="city-input" placeholder="Search city or location...">
                <button id="search-btn" aria-label="Search city">
                    <i class="fas fa-search"></i>
                </button>
                <button id="location-btn" aria-label="Use current location">
                    <i class="fas fa-location-arrow"></i>
                </button>
            </div>
            <div class="recent-searches" id="recent-searches">
                <!-- Recent cities will appear here -->
            </div>
        </div>

        <!-- Current Weather -->
        <main class="weather-display">
            <div class="current-weather-card">
                <div class="location-info">
                    <h2 id="city-name">New York, US</h2>
                    <p id="current-date"><?php echo date('l, F j, Y'); ?></p>
                    <p id="weather-description">--</p>
                </div>
                <div class="temperature-section">
                    <div class="temp-main">
                        <img id="weather-icon" src="https://openweathermap.org/img/wn/10d@2x.png" alt="Weather icon">
                        <div>
                            <h1 id="current-temp">--°C</h1>
                            <p class="feels-like">Feels like <span id="feels-like">--°</span></p>
                        </div>
                    </div>
                    <div class="temp-details">
                        <div class="detail-item">
                            <i class="fas fa-wind"></i>
                            <div>
                                <span class="label">Wind</span>
                                <span id="wind-speed">-- km/h</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-tint"></i>
                            <div>
                                <span class="label">Humidity</span>
                                <span id="humidity">--%</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-temperature-high"></i>
                            <div>
                                <span class="label">Pressure</span>
                                <span id="pressure">-- hPa</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-eye"></i>
                            <div>
                                <span class="label">Visibility</span>
                                <span id="visibility">-- km</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hourly Forecast -->
            <section class="hourly-forecast">
                <h3><i class="fas fa-clock"></i> Hourly Forecast</h3>
                <div class="hourly-scroll" id="hourly-forecast">
                    <!-- Hours will be added here -->
                </div>
            </section>

            <!-- 5-Day Forecast -->
            <section class="daily-forecast">
                <h3><i class="fas fa-calendar-alt"></i> 5-Day Forecast</h3>
                <div class="forecast-grid" id="daily-forecast">
                    <!-- Days will be added here -->
                </div>
            </section>

            <!-- Air Quality -->
            <div class="air-quality-card" id="air-quality">
                <h3><i class="fas fa-wind"></i> Air Quality</h3>
                <div class="aqi-level">
                    <div class="aqi-circle">
                        <span id="aqi-value">--</span>
                        <small>AQI</small>
                    </div>
                    <div class="aqi-info">
                        <h4 id="aqi-status">Loading...</h4>
                        <p id="aqi-message">Air quality data is being fetched</p>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="app-footer">
            <p>Data provided by <a href="https://openweathermap.org/" target="_blank">OpenWeatherMap</a></p>
            <p class="update-time">Last updated: <span id="update-time">--:--</span></p>
        </footer>
    </div>

    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loading">
        <div class="loader">
            <i class="fas fa-sun fa-spin"></i>
            <p>Fetching weather data...</p>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <script src="js/app.js"></script>
</body>
</html>