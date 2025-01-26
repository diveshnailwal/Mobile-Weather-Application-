<<<<<<< HEAD
# Mobile-Weather-Application-
A React Native application that allows users to search for weather details by city, receive real-time temperature updates, toggle between light and dark mode, and switch between Celsius and Fahrenheit units. It also stores recently searched cities locally for quick access.

______x______
Features
Search Weather Details:

Fetches weather data (temperature, humidity, wind speed, etc.) using the OpenWeatherMap API.
Real-Time Temperature Updates:

Displays live temperature updates from a WebSocket server.
Light and Dark Mode:

Automatically adapts to the device's system theme.
Light mode uses black text, while dark mode uses yellow text for enhanced visibility.
Celsius and Fahrenheit Toggle:

Users can switch between Celsius and Fahrenheit units dynamically.
Recently Searched Cities:

Stores the last 5 searched cities locally using AsyncStorage.
Allows quick access to previously searched cities.
Smooth Animations:

Weather details appear with a fade-in animation for a better user experience.

______X______

Setup Instructions
Prerequisites
Node.js (v14 or higher)
Expo CLI
OpenWeatherMap API key

______X______

Installation
Clone the repository:
git clone <repository-url>
cd WeatherApp

______X______

Install dependencies:

npm install
Add your OpenWeatherMap API key: //Make sure generate yourself in openWeathermap, if you use mine it has limit to 1000 requests.

Navigate to constants/api.ts.
Replace YOUR_API_KEY with your OpenWeatherMap API key:
export const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const WEATHER_API_KEY = 'YOUR_API_KEY';

______X______

Start the WebSocket server:

Add the server.js file to the root directory:
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  setInterval(() => {
    const temperature = (Math.random() * 10 + 20).toFixed(2);
    ws.send(JSON.stringify({ temperature }));
  }, 5000);
});

console.log('WebSocket server is running on ws://localhost:5000');

______X______

Run the server:
node server.js
Start the app:
______X______

open the new code editor window whith same project folder and run- 
npm start expo

______X______

![IMG-20250126-WA0001](https://github.com/user-attachments/assets/920b4eb0-8ef2-43fe-9dfd-00676d66daea)
![IMG-20250126-WA0003](https://github.com/user-attachments/assets/3f4c7809-24b8-4728-84de-63aa4a53c4ea)
![IMG-20250126-WA0004](https://github.com/user-attachments/assets/b835c40f-dc5d-43ca-be07-89776a469a5a)
![IMG-20250126-WA0002](https://github.com/user-attachments/assets/9d1bef6b-aad1-4b6f-9f5e-1af00b5e593c)



Usage
Search for Weather:

Enter a city name in the search bar and press the Search button.
Weather details for the city (temperature, humidity, wind speed) will be displayed.
Toggle Temperature Unit:

Click the Switch to Fahrenheit/Celsius button to toggle between units.
Real-Time Updates:

Live temperature updates will appear under "Real-Time Temperature."
Dark Mode:

Switch your device to dark mode to see the app adapt with a yellow-text theme.
Recently Searched Cities:

A list of the last 5 searched cities is displayed.
Tap a city from the list to fetch its weather details again.
=======
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
>>>>>>> ab14e71 (Initial commit)
