'use strict';

const { Sequelize } = require('sequelize');
const { toDefaultValue } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize){
    await queryInterface.addColumn('Users1', 'roleId',{
      type : Sequelize.INTEGER,
      allowNull : false,
      defaultValue : 6,
      references : {
        model : 'Roles',
        key : 'id'
      }
    });
  },

  async down(queryInterface, Sequelize){
    await queryInterface.removeColumn('Users1', 'roleId');
  }
};
