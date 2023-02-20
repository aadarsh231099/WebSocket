const WebSocket = require('ws');
const fs = require('fs');

const wsOptions = {
  rejectUnauthorized: false,
  cert: fs.readFileSync('C:\\Users\\91808\\Desktop\\Numo\\WebSocket\\cert.pem'),
};

const ws = new WebSocket('wss://localhost:3000', wsOptions);

ws.addEventListener('open', () => {
  console.log('Connected to server');
  
  const message = [1, "Hello, server!"];
  ws.send(JSON.stringify(message));
  console.log(`Sent message: ${JSON.stringify(message)}`);
});

ws.addEventListener('message', (event) => {
  console.log(`Received message: ${event.data}`);
});

ws.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});

ws.addEventListener('close', () => {
  console.log('Disconnected from server');
});
