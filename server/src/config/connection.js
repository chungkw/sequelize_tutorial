const { Sequelize } = require('sequelize');
const { name, user, password, host, port } = require('.').db;

const db = new Sequelize(name, user, password, {
    host, port, dialect: 'mysql'
});

module.exports = db;
