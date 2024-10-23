"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var db = {};
require("../config/constant");

let sequelize = new Sequelize(
  CONFIG.db_name,
  CONFIG.db_user,
  CONFIG.db_password,
  {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
    logging: false,
    define: {
      timestamps: false,
      underscored: true,
    },
    pool: {
      max: Number(CONFIG.max_pool_conn),
      min: Number(CONFIG.min_pool_conn),
    },
    dialectOptions: {
      useUTC: true,
    },
  }
);

const schemaCreate = async function () {
  try {
    const schemas = await sequelize.showAllSchemas(); 
    if (schemas.indexOf('Sport') < 0) {
      await sequelize.createSchema('Sport');
      console.log('Schema Sport created');
    }
  } catch (error) {
    console.error('Error creating schema:', error);
  }
};

fs.readdirSync(__dirname + "/table").forEach((file) => {
  var model = require(path.join(__dirname + "/table", file))(
    sequelize,
    Sequelize.DataTypes
  );
  db[file.slice(0, -3)] = model; 
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.schemaCreate = schemaCreate();
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
