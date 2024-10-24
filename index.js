
const { setupWebSocket } = require('./websocket.js');
require('./config/config.js');
const models = require("./model/index.js");
var express = require("express");
app = express(); // Initializing Express application

var v1 = require('./routes/v1.js');
require('./global_functions.js');
app.use(express.json());

models.sequelize
  .authenticate()
  .then(() => {
    models.schemaCreate.then(() => {
      models.sequelize.sync().then(async () => {

      })
    })
    console.log(CONFIG.db_name)
  });

setupWebSocket(app);


// Start the server
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

setupWebSocket(server);

app.use(function (req, res, next) {
  // if (req && req.headers && req.headers.authorization) {
  //   req.headers.authorization = cryptoService.decrypt(req.headers.authorization);
  // }
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use('/v1', v1);

module.exports = app;