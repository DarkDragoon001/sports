const WebSocket = require('ws');

let clients = {}; // Store connected clients with their user IDs

function setupWebSocket(server) {
  // Create WebSocket server
  const wss = new WebSocket.Server({ server });

  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    // Assign a unique user ID to each new connection
    const userId = `user-${Math.floor(Math.random() * 10000)}`;
    clients[userId] = ws;
    console.log(`Client ${userId} connected`);
    // Notify the client of its user ID
    ws.send(JSON.stringify({ type: 'assignId', userId }));

    // Notify all clients about the newly connected user
    broadcastUserList(wss);

    // Handle messages from the client
    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === 'privateMessage') {
        const targetId = parsedMessage.targetId;
        const messageText = parsedMessage.message;

        // Send the message to the target client only
        if (clients[targetId] && clients[targetId].readyState === WebSocket.OPEN) {
          clients[targetId].send(
            JSON.stringify({ from: userId, message: messageText })
          );
        }
      }
    });

    // Handle WebSocket close
    ws.on('close', () => {
      delete clients[userId];
      broadcastUserList(wss);
      console.log(`Client ${userId} disconnected`);
    });
  });

  // Send the list of users to all clients
  function broadcastUserList(wss) {
    const userList = Object.keys(clients);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'userList', users: userList }));
      }
    });
  }
}

module.exports = { setupWebSocket };
