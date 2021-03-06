'use strict'
const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: 'Please provide a title'
        }
      }
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Course description is required'
        },
        notEmpty: {
          msg: 'Please provide a course description'
        }
      }
    },

    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Estimated time is required'
        },
        notEmpty: {
          msg: 'Please provide an estimated course time'
        }
      }
    },

    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A list of materials are required'
        },
        notEmpty: {
          msg: 'Please provide a list of materials'
        }
      }
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId is required'
        },
        notEmpty: {
          msg: 'Please provide a userId'
        }
      }
    }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'student',
      foreignKey: {
        fieldName: 'studentCourseId',
        allowNull: false
      }
    })
  }

  return Course;
};
