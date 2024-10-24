const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
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

     UnpireDetails.beforeSave(async (user, options) => {
          let err;
          if (user.changed('password')) {
               let salt, hash;
               let rounds = Math.floor(Math.random() * 6 + 4);
               console.log('Rounds: ', rounds);
               [err, salt] = await to(bcrypt.genSalt(rounds));
               console.log('Salt: ', salt);
               if (err) {
                    console.log('error in encryption in user account' + err.message);
               };
               [err, hash] = await to(bcrypt.hash(user.password, salt));
               console.log('Hash: ', hash);
               if (err) {
                    console.log('error in hash method in encryption' + err.message);
               };

               user.password = hash;
          }
     });

     UnpireDetails.prototype.comparePassword = async function (pw) {
          let err, pass
          if (!this.password) TE(ERROR.password_notset);

          //Password verification
          [err, pass] = await to(bcrypt_p.compare(pw, this.password));
          if (err) TE(err);

          if (!pass) TE(ERROR.invalid_credentials);

          return this;
     };
     return UnpireDetails;
}