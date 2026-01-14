class WeatherApp {
    constructor() {
        // API endpoints
        this.endpoints = {
    geocode: '/skycast/api/geocode.php',
    weather: '/skycast/api/weather.php',
    forecast: '/skycast/api/forecast.php',
    airQuality: '/skycast/api/airquality.php'
};
        
        this.currentCity = 'New York';
        this.recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
        this.isLoading = false;
        
        this.init();
    }

    init() {
        // DOM Elements
        this.elements = {
            cityInput: document.getElementById('city-input'),
            searchBtn: document.getElementById('search-btn'),
            locationBtn: document.getElementById('location-btn'),
            cityName: document.getElementById('city-name'),
            currentDate: document.getElementById('current-date'),
            weatherDesc: document.getElementById('weather-description'),
            weatherIcon: document.getElementById('weather-icon'),
            currentTemp: document.getElementById('current-temp'),
            feelsLike: document.getElementById('feels-like'),
            windSpeed: document.getElementById('wind-speed'),
            humidity: document.getElementById('humidity'),
            pressure: document.getElementById('pressure'),
            visibility: document.getElementById('visibility'),
            hourlyForecast: document.getElementById('hourly-forecast'),
            dailyForecast: document.getElementById('daily-forecast'),
            aqiValue: document.getElementById('aqi-value'),
            aqiStatus: document.getElementById('aqi-status'),
            aqiMessage: document.getElementById('aqi-message'),
            updateTime: document.getElementById('update-time'),
            recentSearches: document.getElementById('recent-searches'),
            loading: document.getElementById('loading'),
            themeSwitch: document.getElementById('theme-switch')
        };

        // Event Listeners
        this.bindEvents();
        
        // Set theme
        this.setTheme();
        
        // Load recent cities
        this.displayRecentCities();
        
        // Get initial weather
        this.getWeatherByCity(this.currentCity);
    }

    bindEvents() {
        // Search on Enter key
        this.elements.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Search on button click
        this.elements.searchBtn.addEventListener('click', () => this.handleSearch());

        // Current location button
        this.elements.locationBtn.addEventListener('click', () => this.getCurrentLocation());

        // Theme toggle
        this.elements.themeSwitch.addEventListener('change', () => this.toggleTheme());

        // Update time every minute
        setInterval(() => this.updateTime(), 60000);
    }

    async handleSearch() {
        const city = this.elements.cityInput.value.trim();
        if (city) {
            this.elements.cityInput.value = '';
            await this.getWeatherByCity(city);
        }
    }

    async getWeatherByCity(city) {
        this.showLoading(true);
        
        try {
            // Step 1: Get coordinates
            const geoData = await this.fetchData(`${this.endpoints.geocode}?city=${encodeURIComponent(city)}`);
            
            if (!geoData.success || !geoData.data || geoData.data.length === 0) {
                throw new Error(`City "${city}" not found. Try another city.`);
            }
            
            const location = geoData.data[0];
            const { lat, lon, name, country } = location;
            
            // Step 2: Fetch all data in parallel
            const [weatherData, forecastData, aqiData] = await Promise.all([
                this.fetchData(`${this.endpoints.weather}?lat=${lat}&lon=${lon}&units=metric`),
                this.fetchData(`${this.endpoints.forecast}?lat=${lat}&lon=${lon}&units=metric`),
                this.fetchData(`${this.endpoints.airQuality}?lat=${lat}&lon=${lon}`)
            ]);
            
            // Check for errors
            if (!weatherData.success) throw new Error(weatherData.error || 'Weather data unavailable');
            if (!forecastData.success) throw new Error(forecastData.error || 'Forecast data unavailable');
            
            this.updateUI(weatherData.data, forecastData.data, aqiData, name, country);
            this.addRecentCity(name);
            
        } catch (error) {
            console.error('Weather App Error:', error);
            this.showError(error.message || 'Failed to fetch weather data');
        } finally {
            this.showLoading(false);
        }
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch Error:', error);
            return { success: false, error: error.message };
        }
    }

    getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }
        
        this.showLoading(true);
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    
                    // Get city name from coordinates
                    const reverseGeoUrl = `${this.endpoints.geocode}?lat=${latitude}&lon=${longitude}`;
                    const geoData = await this.fetchData(reverseGeoUrl);
                    
                    if (!geoData.success || !geoData.data || geoData.data.length === 0) {
                        throw new Error('Location not recognized');
                    }
                    
                    const city = geoData.data[0]?.name || 'Your Location';
                    await this.getWeatherByCity(city);
                    
                } catch (error) {
                    this.showError('Unable to get location: ' + error.message);
                }
            },
            (error) => {
                this.showLoading(false);
                let errorMessage = 'Location access denied';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable in browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }
                this.showError(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    updateUI(weather, forecast, aqi, city, country) {
        // Update current weather
        this.elements.cityName.textContent = `${city}, ${country}`;
        this.elements.weatherDesc.textContent = weather.weather[0].description;
        this.elements.currentTemp.textContent = `${Math.round(weather.main.temp)}°C`;
        this.elements.feelsLike.textContent = `${Math.round(weather.main.feels_like)}°C`;
        this.elements.windSpeed.textContent = `${Math.round(weather.wind.speed * 3.6)} km/h`;
        this.elements.humidity.textContent = `${weather.main.humidity}%`;
        this.elements.pressure.textContent = `${weather.main.pressure} hPa`;
        this.elements.visibility.textContent = `${(weather.visibility / 1000).toFixed(1)} km`;
        
        // Update icon
        const iconCode = weather.weather[0].icon;
        this.elements.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        this.elements.weatherIcon.alt = weather.weather[0].description;
        
        // Update date
        this.updateDate();
        
        // Update hourly forecast
        this.updateHourlyForecast(forecast.list.slice(0, 8));
        
        // Update daily forecast
        this.updateDailyForecast(forecast.list);
        
        // Update air quality if available
        if (aqi && aqi.success && aqi.data && aqi.data.list && aqi.data.list[0]) {
            this.updateAirQuality(aqi.data.list[0]);
        } else {
            this.elements.aqiStatus.textContent = 'Data unavailable';
            this.elements.aqiMessage.textContent = 'Air quality data not available for this location';
            this.elements.aqiValue.textContent = '--';
            this.elements.aqiValue.parentElement.style.background = 'var(--gradient)';
        }
        
        // Update timestamp
        this.updateTime();
    }

    updateHourlyForecast(hourlyData) {
        this.elements.hourlyForecast.innerHTML = '';
        
        hourlyData.forEach(hour => {
            const date = new Date(hour.dt * 1000);
            const time = date.toLocaleTimeString('en-US', { 
                hour: 'numeric',
                hour12: true 
            }).replace(' ', '');
            const temp = Math.round(hour.main.temp);
            const icon = hour.weather[0].icon;
            
            const hourCard = document.createElement('div');
            hourCard.className = 'hour-card';
            hourCard.innerHTML = `
                <span class="time">${time}</span>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${hour.weather[0].description}" loading="lazy">
                <span class="temp">${temp}°</span>
            `;
            
            this.elements.hourlyForecast.appendChild(hourCard);
        });
    }

    updateDailyForecast(forecastData) {
        // Group by day
        const dailyData = {};
        forecastData.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toLocaleDateString();
            if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                    temps: [],
                    weather: item.weather[0],
                    dt: item.dt
                };
            }
            dailyData[dateKey].temps.push(item.main.temp);
        });
        
        // Get next 5 days (skip today)
        const dates = Object.keys(dailyData);
        const nextDays = dates.slice(1, 6);
        
        this.elements.dailyForecast.innerHTML = '';
        
        nextDays.forEach(dateKey => {
            const data = dailyData[dateKey];
            const date = new Date(data.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const highs = Math.round(Math.max(...data.temps));
            const lows = Math.round(Math.min(...data.temps));
            const icon = data.weather.icon;
            
            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';
            dayCard.innerHTML = `
                <div class="day-info">
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${data.weather.description}" loading="lazy">
                    <div>
                        <h4>${dayName}</h4>
                        <p class="weather-condition">${data.weather.description}</p>
                    </div>
                </div>
                <div class="temp-range">
                    <span class="high">${highs}°</span>
                    <span class="low">${lows}°</span>
                </div>
            `;
            
            this.elements.dailyForecast.appendChild(dayCard);
        });
    }

    updateAirQuality(aqiData) {
        const aqi = aqiData.main.aqi;
        this.elements.aqiValue.textContent = aqi;
        
        const aqiLevels = {
            1: { 
                status: 'Excellent', 
                message: 'Air quality is satisfactory. Enjoy outdoor activities.',
                color: '#00e400',
                emoji: '😊'
            },
            2: { 
                status: 'Good', 
                message: 'Air quality is acceptable for most people.',
                color: '#9acd32',
                emoji: '🙂'
            },
            3: { 
                status: 'Moderate', 
                message: 'Sensitive groups should limit outdoor activity.',
                color: '#ffff00',
                emoji: '😐'
            },
            4: { 
                status: 'Poor', 
                message: 'Health effects possible for everyone.',
                color: '#ff7e00',
                emoji: '😷'
            },
            5: { 
                status: 'Very Poor', 
                message: 'Health alert: serious effects possible.',
                color: '#ff0000',
                emoji: '🚨'
            }
        };
        
        const level = aqiLevels[aqi] || aqiLevels[3];
        this.elements.aqiStatus.textContent = `${level.emoji} ${level.status}`;
        this.elements.aqiMessage.textContent = level.message;
        
        const aqiCircle = this.elements.aqiValue.parentElement;
        if (aqiCircle) {
            aqiCircle.style.background = `linear-gradient(135deg, ${level.color}, ${level.color}cc)`;
        }
    }

    updateDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.elements.currentDate.textContent = now.toLocaleDateString('en-US', options);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        this.elements.updateTime.textContent = `Last updated: ${timeString}`;
    }

    addRecentCity(city) {
        // Remove if already exists
        this.recentCities = this.recentCities.filter(c => c.toLowerCase() !== city.toLowerCase());
        
        // Add to beginning
        this.recentCities.unshift(city);
        
        // Keep only 5 most recent
        if (this.recentCities.length > 5) {
            this.recentCities = this.recentCities.slice(0, 5);
        }
        
        localStorage.setItem('recentCities', JSON.stringify(this.recentCities));
        this.displayRecentCities();
    }

    displayRecentCities() {
        this.elements.recentSearches.innerHTML = '';
        
        if (this.recentCities.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'recent-city empty';
            emptyMsg.textContent = 'No recent searches';
            this.elements.recentSearches.appendChild(emptyMsg);
            return;
        }
        
        this.recentCities.forEach(city => {
            const cityEl = document.createElement('div');
            cityEl.className = 'recent-city';
            cityEl.textContent = city;
            cityEl.setAttribute('role', 'button');
            cityEl.setAttribute('tabindex', '0');
            cityEl.setAttribute('aria-label', `Search weather for ${city}`);
            
            cityEl.addEventListener('click', () => {
                this.elements.cityInput.value = city;
                this.handleSearch();
            });
            
            cityEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.elements.cityInput.value = city;
                    this.handleSearch();
                }
            });
            
            this.elements.recentSearches.appendChild(cityEl);
        });
    }

    setTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.elements.themeSwitch.checked = savedTheme === 'dark';
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.elements.themeSwitch.checked = prefersDark;
            document.body.classList.toggle('dark-theme', prefersDark);
            localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        }
    }

    toggleTheme() {
        const isDark = this.elements.themeSwitch.checked;
        document.body.classList.toggle('dark-theme', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    showLoading(show) {
        this.isLoading = show;
        this.elements.loading.style.display = show ? 'flex' : 'none';
        this.elements.cityInput.disabled = show;
        this.elements.locationBtn.disabled = show;
        this.elements.searchBtn.disabled = show;
    }

    showError(message) {
        Toastify({
            text: message,
            duration: 5000,
            gravity: "top",
            position: "right",
            style: {
                background: "#ff4757",
                color: "white",
                borderRadius: "10px",
                padding: "15px 20px",
                fontSize: "14px"
            },
            close: true
        }).showToast();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});