import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('pulkit-test', 'postgres', '123f45678@', {
  host: 'localhost',
  dialect: 'postgres',
  logging : console.log
});  