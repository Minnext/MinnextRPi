var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var blinkInterval = setInterval(blinkLED, 50); //run the blinkLED function every 250ms

function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}

function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}

setTimeout(endBlink, 5000); //stop blinking after 5 seconds

var connectionString = 'HostName=MinnextIoTHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=Fwt3nR++S4HJluC++PdCTpx4zyPcWEm8jOurLJz6luY=';
 
// use factory function from AMQP-specific package
var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
 
// AMQP-specific factory function returns Client object from core package
var client = clientFromConnectionString(connectionString);
 
// use Message object from core package
var Message = require('azure-iot-device').Message;
 
var connectCallback = function (err) {
  if (err) {
    console.error('Could not connect: ' + err);
  } else {
    console.log('Client connected');
    var msg = new Message('some data from my device');
    client.sendEvent(msg, function (err) {
      if (err) {
        console.log(err.toString());
      } else {
        console.log('Message sent');
      };
    });
  };
};
 
 
client.open(connectCallback);