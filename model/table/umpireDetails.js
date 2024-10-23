module.exports = (db, Sequelize) => {
     let UnpireDetails = db.define('unpireDetails', {
          id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          name: {
               type: Sequelize.STRING,
               allowNull: false,
               required: true
          },
          userName: {
               type: Sequelize.STRING,
               allowNull: false,
               required: true
          },
          password: {
               type: Sequelize.STRING,
               allowNull: true
          },
          uniqueId: {
               type: Sequelize.STRING
          },
          created: {
               type: Sequelize.DATE,
               defaultValue: Date.now(),
               allowNull: false,
          },
          modified: {
               type: Sequelize.DATE,
               defaultValue: Date.now(),
               allowNull: false,
          },
     }, {
          tableName: 'unpireDetails',
          schema: 'Sport',
     });
     return UnpireDetails;
}