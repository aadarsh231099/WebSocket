const { Server } = require('ws');
 
const sockserver = new Server({ port: 3000, host: 'localhost' });

sockserver.on('connection', (ws) => {
   console.log('New client connected!'); 
   
   ws.on('close', () => console.log('Client has disconnected!'));

   const response = JSON.stringify({status: 'Accepted',
       currentTime: new Date().toISOString(),
       heartbeatInterval: 300});

   ws.on('message', function message(){
      sockserver.clients.forEach(function each(client){
         if(client){
            client.send(response);
         }
      });
   });
});







