const { Sequelize } = require('sequelize');
const { name, user, password, host, port } = require('./config').db;

const db = new Sequelize(name, user, password, {
    host, port, dialect: 'mysql'
});

db.authenticate()
    .then(() => console.log('CONNECTED TO DATABASE SUCCESSFULLY'))
    .catch((error) => {
        console.log(`FAILED TO CONNECT TO DATABASE: ${error}`);
        process.exit(1);
    });

module.exports = db;
