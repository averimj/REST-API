'use strict'
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required'
        },
        notEmpty: {
          msg: 'Please provide a first name'
        }
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required'
        },
        notEmpty: {
          msg: 'Please provide a last name'
        }
      }
    },

    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email address is required'
        },
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    },

    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: 'Please provide a password'
        },
        len: {
          args: [8, 20],
          msg: 'Please provide a password thats between 8 and 20 characters long'
        }
      }
    },
    
    confirmedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      set (val) {
        if (val === this.password) {
          const hashedPassword = bcrypt.hashedSync(val, 10);
          this.setDataValue('confirmedPassword', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'Both passwords must match'
        }
      }
    }
  })
}
