module.exports = (db, Sequelize) => {
     let candidateDetails = db.define('candidateDetails', {
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
          gender:{
               type: Sequelize.STRING
          },
          dateOfBirth:{
               type: Sequelize.DATE
          },
          district:{
               type: Sequelize.STRING
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
          tableName: 'candidateDetails',
          schema: 'Sport',
     });
     return candidateDetails;
}