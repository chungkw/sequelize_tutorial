const { Sequelize } = require('sequelize');
const { name, user, password, host, port } = require('./config').db;

const pc = require('picocolors');

const db = new Sequelize(name, user, password, {
    host, port, dialect: 'mysql'
});

(async function () {
    try {
        await db.authenticate();
        console.log(pc.green('CONNECTED TO DATABASE SUCCESSFULLY'));
    }
    catch (error) {
        console.log(pc.red('FAILED TO CONNECT TO DATABASE'), error);
        process.exit(1);
    }
})();

module.exports = db;
