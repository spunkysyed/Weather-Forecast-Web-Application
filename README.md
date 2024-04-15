Overview:
This project is a weather forecast web application built using React, TypeScript, and various APIs to provide users with up-to-date weather information for cities around the world. The application allows users to view a table of cities, search for specific locations, filter and sort the data, and click on a city to see detailed weather information.

Features:
Cities Table
Displays cities in a table format with infinite scroll.
Columns include city name, country, timezone, etc.
Implements search as you type with autocomplete suggestions.
Provides filtering and sorting options for each column.
Clicking on a city name navigates to the weather page for that city.
Right-clicking on a city name opens the weather page in a new tab.

Weather Page:
Shows current weather information using the OpenWeatherMap API.
Displays temperature, weather description, humidity, wind speed,  etc.
Provides forecast information including temperature highs/lows, weather descriptions, and precipitation chances.
Optional: Displays location on a map, options for changing units, etc.
Dynamic backgrounds based on current weather conditions.
Responsive design for different screen sizes.
Error handling for failed API requests or invalid search queries.

Optional Features:
Styled with Tailwind CSS for modern and responsive design.
Saves favorite locations for quick access.
Provides options to switch between different units of measurement (e.g., Celsius/Fahrenheit/Kelvin).

Deployment

The application is deployed on Netlify and can be accessed https://weather-sable-pi.vercel.app/

Technologies Used
React
TypeScript
Tailwind CSS
OpenWeatherMap API
Setup Instructions
Clone the repository.
Install dependencies using npm install.
Obtain an API key from OpenWeatherMap and add it WeatherPage.tsx
Run the development server using npm start
