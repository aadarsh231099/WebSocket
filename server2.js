const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });


wss.on('connection', (ws) => {
  console.log('Client connected');
        

        ws.on('message', (message)=>{
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