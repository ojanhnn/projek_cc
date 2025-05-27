import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js"; // pastikan ini impor model user

const { DataTypes } = Sequelize;

const Data = db.define('data', {
    judul: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    tipe_tugas: DataTypes.STRING,
    mata_kuliah: DataTypes.STRING,
    deadline: DataTypes.DATE,
    file_pendukung: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

User.hasMany(Data, { foreignKey: 'userId' });
Data.belongsTo(User, { foreignKey: 'userId' });

export default Data;

(async () => {
    await db.sync();
})();
