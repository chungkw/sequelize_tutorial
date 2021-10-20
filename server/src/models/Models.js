// we use this file to access all our models so we have control of when the model files are initialised
// this can help with avoiding dependency issues

const { Users } = require('./Users');
const { Stories } = require('./Stories');

const { Games } = require('./Games');
const { Categories, Games_Categories } = require('./Categories');
const { Reviews } = require('./Reviews');

module.exports = {
    Users,
    Stories,
    Games, Categories, Games_Categories,
    Reviews
};
