// Check for Gamepad API support
if ('getGamepads' in navigator) {
    console.log('Gamepad API supported!');
  } else {
    alert('Gamepad API not supported in this browser.');
  }
  
  let joystickIndex = null;
  let canShift = true;
  let rpm = 800;
  let targetRPM = 800;
  let gear = 1;
  const minRPM = 800;   // Idle RPM
  const maxRPM = 7000;  // Redline RPM
  const gearRatios = [0, 3.5, 2.2, 1.5, 1.0, 0.8, 0.6]; // Gear ratios for gears 1-6
  
  // Optimal RPM ranges for each gear (Example values)
  const optimalShiftRPM = [0, 3000, 4000, 4500, 5000, 5500, 6000];
  
  // Load engine sound
  let engineSound = new Audio('engine-sound.mp3');
  engineSound.loop = true;
  
  engineSound.addEventListener('canplaythrough', () => {
    engineSound.play();
  }, false);
  
  // Gamepad connection handler
  window.addEventListener('gamepadconnected', (event) => {
    joystickIndex = event.gamepad.index;
    console.log('Gamepad connected at index:', joystickIndex);
    readJoystickInput();
  });
  
  window.addEventListener('gamepaddisconnected', (event) => {
    console.log('Gamepad disconnected from index:', event.gamepad.index);
    joystickIndex = null;
  });
  
  // Main loop to read joystick input
  function readJoystickInput() {
    const gamepads = navigator.getGamepads();
    const joystick = gamepads[joystickIndex];
  
    if (joystick) {
      // Gear shifting with joystick Y-axis (forward/backward)
      const gearAxis = joystick.axes[1]; // Y-axis (forward/backward)
      handleGearShift(gearAxis);
  
      // Acceleration with trigger button
      const triggerButtonPressed = joystick.buttons[0].pressed; // Assuming button[0] is the trigger
      updateThrottle(triggerButtonPressed);
    }
  
    // Gradually update RPM towards targetRPM
    updateRPM();
  
    requestAnimationFrame(readJoystickInput);
  }
  
  // Handle gear shifting based on joystick axis movement
  function handleGearShift(gearAxisValue) {
    // Set thresholds for detecting forward/backward movement
    const shiftThreshold = 0.8; // Adjust as needed (range -1 to 1)
  
    // Debounce gear shifting to prevent multiple shifts from a single movement
    if (canShift) {
      if (gearAxisValue <= -shiftThreshold) {
        // Joystick pushed forward (negative value) - Upshift
        shiftGearUp();
        canShift = false;
        setTimeout(() => { canShift = true; }, 500); // 500ms debounce time
      } else if (gearAxisValue >= shiftThreshold) {
        // Joystick pulled backward (positive value) - Downshift
        shiftGearDown();
        canShift = false;
        setTimeout(() => { canShift = true; }, 500); // 500ms debounce time
      }
    }
  }
  
  // Shift gear up
  function shiftGearUp() {
    if (gear < 6) {
      gear++;
      console.log('Shifted up to gear:', gear);
      document.getElementById('gear-display').textContent = gear;
    }
  }
  
  // Shift gear down
  function shiftGearDown() {
    if (gear > 1) {
      gear--;
      console.log('Shifted down to gear:', gear);
      document.getElementById('gear-display').textContent = gear;
    }
  }
  
  // Update throttle based on trigger button
  function updateThrottle(triggerPressed) {
    // Set target RPM based on throttle input
    const gearRatio = gearRatios[gear];
    if (triggerPressed) {
      // Increase target RPM gradually to simulate smooth acceleration
      targetRPM += gearRatio * 20; // Adjust the increment value for smoothness
    } else {
      // Decrease target RPM gradually to simulate deceleration
      targetRPM -= gearRatio * 30; // Adjust the decrement value for smoothness
    }
  
    // Clamp target RPM within min and max RPM
    targetRPM = Math.max(minRPM, Math.min(targetRPM, maxRPM));
  }
  
  // Gradually update RPM towards target RPM
  function updateRPM() {
    const rpmDifference = targetRPM - rpm;
    const rpmChange = rpmDifference * 0.1; // Adjust the multiplier for responsiveness
    rpm += rpmChange;
  
    // Ensure RPM stays within bounds
    rpm = Math.max(minRPM, Math.min(rpm, maxRPM));
  
    // Update the tachometer display and engine sound
    updateTachometer(rpm);
    updateEngineSound(rpm);
    checkShiftNotification(rpm);
  }
  
  // Update the tachometer display
  function updateTachometer(rpm) {
    const canvas = document.getElementById('tachometer');
    resizeCanvasToDisplaySize(canvas);
    const ctx = canvas.getContext('2d');
  
    const width = canvas.width;
    const height = canvas.height;
  
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
  
    // Draw the tachometer background
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - 20, 0.75 * Math.PI, 0.25 * Math.PI, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#444';
    ctx.stroke();
  
    // Draw the RPM needle
    const angle = ((rpm - minRPM) / (maxRPM - minRPM)) * Math.PI * 1.5 + 0.75 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(
      width / 2 + (width / 2 - 40) * Math.cos(angle),
      height / 2 + (height / 2 - 40) * Math.sin(angle)
    );
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
  
    // Display the RPM text
    ctx.font = `${width / 10}px Arial`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(`RPM: ${Math.floor(rpm)}`, width / 2, height - 30);
  }
  
  // Resize canvas to fill the screen
  function resizeCanvasToDisplaySize(canvas) {
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.width; // Make it square
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }
  
  // Update engine sound playback rate based on RPM
  function updateEngineSound(rpm) {
    // Set playback rate proportional to RPM
    const playbackRate = rpm / maxRPM;
    engineSound.playbackRate = Math.max(0.5, playbackRate); // Ensure playbackRate doesn't go below 0.5
  }
  
  // Check and display shift notifications
  function checkShiftNotification(rpm) {
    const notificationElement = document.getElementById('notification');
    const optimalRPM = optimalShiftRPM[gear];
  
    if (rpm >= optimalRPM && gear < 6) {
      // Recommend upshift
      notificationElement.textContent = 'Upshift Recommended';
      notificationElement.style.display = 'block';
    } else if (rpm <= optimalRPM - 1500 && gear > 1) {
      // Recommend downshift
      notificationElement.textContent = 'Downshift Recommended';
      notificationElement.style.display = 'block';
    } else {
      // Hide notification
      notificationElement.style.display = 'none';
    }
  }
  