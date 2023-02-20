const WebSocket = require('ws');
const fs = require('fs');
const https = require('https');

const options = {
  cert: fs.readFileSync('C:\\Users\\91808\\Desktop\\Numo\\WebSocket\\cert.pem'),
  key: fs.readFileSync('C:\\Users\\91808\\Desktop\\Numo\\WebSocket\\key.pem')
};


const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, world!');
});

const wss = new WebSocket.Server({ server });

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

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});


