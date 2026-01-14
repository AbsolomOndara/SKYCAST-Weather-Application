SkyCast Weather Application 🌤️
A beautiful, responsive weather application built with PHP, HTML, CSS, and JavaScript that provides real-time weather information with premium UX/UI design.

https://img.shields.io/badge/SkyCast-Weather%2520App-blue
https://img.shields.io/badge/PHP-8.2%252B-purple
https://img.shields.io/badge/JavaScript-ES6%252B-yellow
https://img.shields.io/badge/Responsive-Yes-green
https://img.shields.io/badge/License-MIT-blue

✨ Features
🌡️ Weather Information
Current weather conditions

Hourly forecast (next 8 hours)

5-day weather forecast

Air Quality Index (AQI)

Real-time weather updates

🎨 Premium Design
Dark/Light mode toggle

Glassmorphism UI design

Smooth animations and transitions

Fully responsive (mobile, tablet, desktop)

Weather icons and visual indicators

🔍 Search & Location
Search any city worldwide

Current location detection

Recent search history

Auto-complete suggestions

⚡ Performance
Fast API response via PHP backend

LocalStorage for caching

Optimized images and assets

Progressive Web App features

📋 Prerequisites
PHP 7.4 or higher

XAMPP/WAMP/MAMP (or any PHP server)

OpenWeatherMap API key (free)

Modern web browser

🚀 Quick Installation
Option 1: Using XAMPP (Windows/Mac)
Download and install XAMPP

Visit: https://www.apachefriends.org/

Download and install XAMPP

Clone/Copy the project

bash
# Place project in htdocs folder
C:\xampp\htdocs\skycast-weather-app\
Get API Key

Sign up at https://openweathermap.org/api

Get your free API key

Add to config.php:

php
define('OWM_API_KEY', 'your_api_key_here');
Start the server

Open XAMPP Control Panel

Start Apache module

Open browser: http://localhost/skycast-weather-app/

Option 2: Using PHP Built-in Server
bash
# Navigate to project folder
cd path/to/skycast-weather-app

# Start PHP server
php -S localhost:8000

# Open in browser
http://localhost:8000
📁 Project Structure
text
skycast-weather-app/
│
├── index.php              # Main application page
├── config.php             # Configuration & API settings
│
├── api/                   # PHP API handlers
│   ├── geocode.php        # City to coordinates
│   ├── weather.php        # Current weather data
│   ├── forecast.php       # Weather forecast
│   └── airquality.php     # Air quality data
│
├── css/
│   └── style.css          # Premium styling with animations
│
├── js/
│   └── app.js             # Frontend functionality
│
├── assets/                # Icons, images, fonts
│   └── (optional)
│
└── README.md              # This file
⚙️ Configuration
1. API Key Setup
Edit config.php:

php
define('OWM_API_KEY', 'your_openweathermap_api_key_here');
2. Database (Optional)
No database required! The app uses:

LocalStorage: For recent searches and preferences

Session Storage: For temporary data

API Caching: Built-in with PHP

3. Environment Variables
Create .env file (optional):

env
OWM_API_KEY=your_api_key_here
APP_ENV=development
CACHE_ENABLED=true
🌐 API Endpoints
PHP Backend API
text
GET /api/geocode.php?city={city_name}
GET /api/weather.php?lat={latitude}&lon={longitude}
GET /api/forecast.php?lat={latitude}&lon={longitude}
GET /api/airquality.php?lat={latitude}&lon={longitude}
External API Used
OpenWeatherMap Current Weather API

OpenWeatherMap 5-day Forecast API

OpenWeatherMap Geocoding API

OpenWeatherMap Air Pollution API

📱 Usage Guide
Searching Weather
Type city name in search box

Press Enter or click search button

View detailed weather information

Using Current Location
Click location button (📍)

Allow location permission

Get weather for your current location

Theme Switching
Toggle between Dark/Light mode using the switch

Theme preference saved in browser

Recent Searches
Click on recent cities for quick access

Max 5 recent cities stored

🔧 Development
Adding New Features
Add new weather data:

php
// In api/weather.php
$data['new_metric'] = $weatherData['new_property'];
Modify styling:

css
/* In css/style.css */
.new-class {
    /* Your styles */
}
Extend JavaScript:

javascript
// In js/app.js
class WeatherApp {
    newMethod() {
        // New functionality
    }
}
Running Tests
Open browser console (F12) to debug:

javascript
// Test API endpoints
fetch('/api/geocode.php?city=London')
    .then(response => response.json())
    .then(console.log);
🛠️ Troubleshooting
Common Issues
Issue	Solution
API Key not working	Verify key at https://openweathermap.org/api
CSS not loading	Check console for 404 errors on CSS file
PHP not executing	Ensure Apache is running in XAMPP
Location not working	Enable location permissions in browser
No weather data	Check internet connection and API status
Debug Mode
Enable debug in config.php:

php
error_reporting(E_ALL);
ini_set('display_errors', 1);
Checking Logs
XAMPP: C:\xampp\apache\logs\

PHP Errors: Check browser console and PHP error logs

Network Issues: Use browser's Network tab (F12)

🎨 Design System
Colors
Primary: #4361ee - #3a0ca3

Accent: #4cc9f0

Dark Theme: Deep blue/purple gradients

Light Theme: Light blue/white gradients

Typography
Primary Font: Poppins (Google Fonts)

Fallback: Arial, sans-serif

Sizes: Responsive typography scale

Components
Glassmorphism cards

Animated weather icons

Interactive buttons with hover effects

Smooth scrolling forecasts

📊 Data Flow
text
User Input → JavaScript → PHP API → OpenWeatherMap API
      ↓
OpenWeatherMap Response → PHP Processing → JSON Output
      ↓
JavaScript Parsing → DOM Update → User Interface
🔒 Security
Implemented Security Features
API keys stored server-side only

Input sanitization for city names

CORS headers properly set

XSS prevention through output encoding

Best Practices
Never expose API keys in frontend code

Use HTTPS in production

Implement rate limiting

Validate all user inputs

📈 Performance
Optimizations
Caching: PHP file_get_contents with caching

Lazy Loading: Images load on demand

Minification: CSS and JS minified

Compression: Gzip enabled in .htaccess

Load Times
Initial load: < 2 seconds

API response: < 1 second

Theme switching: Instant

🌍 Browser Support
Browser	Version	Status
Chrome	60+	✅ Fully supported
Firefox	55+	✅ Fully supported
Safari	12+	✅ Fully supported
Edge	79+	✅ Fully supported
Opera	50+	✅ Fully supported
📱 Mobile Support
iOS: 12+

Android: 8+

Responsive: All screen sizes

Touch Optimized: Large touch targets

Offline: Basic offline support

🔄 Updates
Version 1.0.0
Initial release with core features

Current weather and forecasts

Dark/Light theme

Recent searches

Planned Features
Weather alerts

Multiple unit support

Weather maps

Historical data

Multi-language support

🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open Pull Request

Development Guidelines
Follow existing code structure

Add comments for complex logic

Test on multiple browsers

Update documentation

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
OpenWeatherMap for providing the weather data API

Font Awesome for beautiful icons

Google Fonts for typography

Toastify for notification toasts

All contributors and testers

📞 Support
Documentation
OpenWeatherMap API Docs

PHP Documentation

JavaScript Documentation

Contact


Email: absolomjayson46@gmail.com

Discord: Join our community

Resources
Weather Icons Guide

API Status

Development Forum

⭐ Star History
https://api.star-history.com/svg?repos=yourusername/skycast-weather-app&type=Date

Made with ❤️ [Absolom Jason]

Enjoy accurate weather forecasts with beautiful design!

