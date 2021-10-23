const { Sequelize } = require('sequelize');
const { name, user, password, host, port } = require('./config').db;

const db = new Sequelize(name, user, password, {
    host, port, dialect: 'mysql'
});

module.exports = db;
