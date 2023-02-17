const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const server = {
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
  key: fs.readFileSync(path.join(__dirname, 'key.pem'))
};


const wss = new WebSocket.Server({ port: 3000, serverOptions: server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    const json = JSON.parse(message);

    const response = [
      2,
      json[1],
      {
        status: 'Accepted',
        currentTime: new Date().toISOString(),
        heartbeatInterval: 300,
      },
    ];

    ws.send(JSON.stringify(response));
    console.log(`Sent message: ${JSON.stringify(response)}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

