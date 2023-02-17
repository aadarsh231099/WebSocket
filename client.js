const WebSocket = require('ws');
      const ws = new WebSocket('ws://localhost:3000');
      
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
