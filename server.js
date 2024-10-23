
const { setupWebSocket } = require('./websocket');
require('./config/config.js');
const models = require("./model/index.js");
var express = require("express");
app = express(); // Initializing Express application

models.sequelize
    .authenticate()
    .then(() => {
      models.schemaCreate.then(() => {
        models.sequelize.sync().then(async () => {
          
        })})
      console.log(CONFIG.db_name)
});

setupWebSocket(app);


// Start the server
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

setupWebSocket(server);
