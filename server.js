const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  setInterval(() => {
    const temperature = (Math.random() * 10 + 20).toFixed(2);
    ws.send(JSON.stringify({ temperature }));
  }, 5000);
});

console.log('WebSocket server is running on ws://localhost:5000');
