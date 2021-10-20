const db = require('../config/connection');
const { DataTypes } = require('sequelize');

const Users = db.define(
    'Users', // model alias
    {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'users', // the actual name of the table in the database
        timestamps: true, // enable timestamps for created at and updated at
        createdAt: 'created_at', // name of the created at column
        updatedAt: 'updated_at' // name of the updated at column
    }
);

module.exports = { Users };
