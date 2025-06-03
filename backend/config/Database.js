import { Sequelize } from "sequelize";

const db = new Sequelize('dbr-tcc','root','', {
  host: "34.172.93.114",
  dialect: "mysql"
});

export default db;
