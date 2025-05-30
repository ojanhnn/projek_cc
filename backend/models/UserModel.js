import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "user",
  {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.TEXT
    },
  },{
    freezeTableName : true
}
);

db.sync().then(() => console.log("Database synced"));

export default User;
