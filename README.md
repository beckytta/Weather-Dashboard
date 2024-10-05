Weather Dashboard
1. Project Overview

Objective

The Weather Dashboard project aimed to create a dynamic, user-friendly web application that allows users to search for current weather conditions in various cities and retrieve weather updates for their current location using geolocation.

 By using the OpenWeatherMap API, the application provides real-time weather data including hourly forecasts, temperature, humidity, wind speed, and more.

Features

1. City Search: Users can search for the weather information of any city by entering its name in the search input.
Geolocation Support: The application detects the user's current location and provides real-time weather data for that area.
Current Weather Display: The dashboard showcases the current temperature, weather condition icon, humidity, wind speed, and other essential details.

2. Hourly Forecast: The application displays an hourly weather forecast for the current day, allowing users to track weather changes throughout the day.

3. 5-day  Forecast: In addition to the current weather, the dashboard provides a 5-day forecast, giving users an extended outlook for future weather conditions.

4. Responsive Design: The application is mobile-friendly, ensuring an optimal user experience on various devices.

5. Theme Toggle: Users can switch between light and dark modes for a customized viewing experience.

Below is a link of my project as deployed from vercel.

https://weather-dashboard-six-phi.vercel.app/

2. Development Process

Key Steps
Initial Setup: The project began by setting up the HTML structure and layout, designing placeholders for the current weather, hourly forecast, and weekly forecast sections.

API Integration: The OpenWeatherMap API was integrated to fetch and display current weather data, hourly updates, and a 5-day forecast for cities. I also included the Geolocation API to automatically detect the user's location and display weather information for that area and Air pollution API to get detailed air quality information on the user’s location or searched city.

Geolocation Implementation: By incorporating the Geolocation API, I enabled users to retrieve weather data based on their current physical location, improving the app's convenience and user experience.

Hourly and 5-days  Forecast: JavaScript was used to extract and display hourly and 5-days weather forecasts.

Design & Responsiveness: CSS was utilized to style the application and ensure the layout adapts to different screen sizes, including mobile devices. I also implemented a theme toggle function to allow users to switch between light and dark modes.


Tools & Technologies

HTML: Structuring the web page content, 
ensuring  accuracy and accessibility.

CSS: Styling the dashboard, making use of responsive design techniques for mobile compatibility.

JavaScript: Handling API requests, DOM manipulation, and interaction logic.

OpenWeatherMap API: Used to fetch real-time weather data and display it on the dashboard.

Geolocation API: Integrated to detect the user’s current location and provide localized weather updates.

Air pollution API:  Used to get air quality information for a location.

FontAwesome: Used for icons  i.e humidity icon, pressure etc


