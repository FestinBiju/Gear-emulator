# Car Dashboard Simulator

An interactive web-based car dashboard simulator featuring real-time RPM and speed displays, responsive UI, and joystick support.

## 🚗 Project Overview
The Car Dashboard Simulator recreates a realistic car dashboard experience with RPM and speed meters, throttle control, gear shifting, and audio feedback. Built with HTML, CSS, and JavaScript, this simulator integrates the Web Gamepad API, allowing users to interact with the dashboard through joystick inputs. The application is designed to be responsive and accessible on both desktop and mobile devices.

## 🎯 Features
- **Real-Time Speedometer and Tachometer**: Displays accurate RPM and speed values based on throttle and gear input.
- **Smooth Throttle and Gear Control**: Simulates acceleration and deceleration realistically, with gradual RPM transitions.
- **Responsive User Interface**: Flexbox-based layout adapts across screen sizes for both desktop and mobile viewing.
- **Shift Notifications**: Guides the user with upshift or downshift notifications based on optimal RPM ranges.
- **Joystick Compatibility**: Supports joystick input for throttle control, gear shifting, and navigation.

## 📂 Project Structure
```plaintext
.
├── index.html       # Main HTML file containing dashboard structure
├── style.css        # CSS for styling the dashboard layout and elements
└── app.js           # JavaScript for handling joystick inputs, RPM/speed calculations, and audio playback
```

## 🛠️ Installation and Setup
### Clone the Repository:

### bash
Copy code
`git clone https://github.com/yourusername/car-dashboard-simulator.git`
`cd car-dashboard-simulator`
### Serve the Application:

Open index.html in a browser, or use a local development server (e.g., Live Server for VS Code) to ensure the Web Gamepad API works.
Connect a Joystick:

The simulator requires a joystick that supports the Web Gamepad API for full interactivity.
Follow browser prompts to allow joystick access if prompted.

## 💻 Usage
- Connecting the Joystick: Click on "Connect Joystick" in the simulator interface, or ensure your joystick is connected and recognized by the browser.
- Throttle Control: Use the joystick’s trigger button to control acceleration.
- Gear Shifting: Move the joystick up or down to change gears.
- Shift Notifications: Watch for shift recommendations based on RPM levels.
- Speed and RPM Monitoring: Observe the speedometer and tachometer for real-time feedback.

## 📋 Project Details
### Key Components and Functions
- updateThrottle: Adjusts target RPM and current speed based on throttle input.
- updateRPM: Smoothly transitions RPM to simulate realistic acceleration.
- updateSpeedometer: Updates the speedometer needle and speed display in real-time.
- checkShiftNotification: Displays notifications for optimal gear shifts.
- updateEngineSound: Adjusts engine sound pitch based on RPM for immersive feedback.
### Dependencies
Web Gamepad API: Required for joystick input support.
Engine sound file (assets/engine-sound.mp3).
### 🌐 Browser Compatibility
This project is best experienced in Chrome or Edge, as these browsers support the Web Gamepad API. It may not work in Firefox or Safari.
### 🚀 Future Enhancements
Add dynamic gauges for fuel and temperature.
Integrate more advanced joystick controls.
Provide multi-language support for broader accessibility.
