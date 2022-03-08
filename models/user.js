const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    //define an id column
    id: {
        //use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        //equivalent of sql's `NOT NULL` option
        allowNull: false,
        //instruct that this is the Primary Key
        primaryKey: true,
        //turn on auto increment 
        autoIncrement: true
    },
    //define a username column 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //define an email column 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        //there cannot be duplicate emails in table
        unique: true,
        //if AllowNull is set to false, we can run data through validation
        validate: {
            isEmail: true
        }
    },
    //define a password column 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //this means password ,ust be at least 4 characters 
            len: [4]
        }
    }
  },
  {
    hooks: {
      //set up beforeCreate lifecycle "hook" functionality
      // beforeCreate(userData) {
      //   //salt round value of 10
      //   return bcrpyt.hash(userData.password, 10).then(newUserData => {
      //     return newUserData
      // });
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
  }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;