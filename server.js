const express = require('express');
 
const server = express()
 .use((req, res) => res.sendFile('/index.html', { root: __dirname }))
 .listen(3000, () => console.log(`Listening on ${3000}`));

 const { Server } = require('ws');
 
const sockserver = new Server({ port: 443 });
sockserver.on('connection', (ws) => {
   console.log('New client connected!'); 
   ws.on('close', () => console.log('Client has disconnected!'));
});
 
setInterval(() => {
   sockserver.clients.forEach((client) => {
       const data = JSON.stringify({'type': 'time', 'time': new Date().toTimeString()});
       client.send(data);
   });
}, 1000);
 
setInterval(() => {
   sockserver.clients.forEach((client) => {
       const messages = ['Hello', 'What do you ponder?', 'Thank you for your time', 'Be Mindful', 'Thank You'];
       const random = Math.floor(Math.random() * messages.length);
       let position = {x: Math.floor(Math.random() * 200), y: Math.floor(Math.random() * 150)}
       const data = JSON.stringify({'type': 'message', 'message': messages[random], 'position': position});
       client.send(data);
   });
}, 8000);

sockserver.on('connection', (ws) => {
   console.log('New client connected!'); 
   ws.on('close', () => console.log('Client has disconnected!'));
});

setInterval(() => {
   sockserver.clients.forEach((client) => {
       const data = JSON.stringify({'type': 'time', 'time': new Date().toTimeString()});
       client.send(data);
   });
}, 1000);