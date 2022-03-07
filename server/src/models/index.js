// we use this file to access all our models so we have control of when the model files are initialised
// this can help with avoiding dependency issues
// files are loaded in the order of their import

// importers of this file will have access to everything
// they make use of object destructuring to import exactly what they need

const { Users } = require('./Users');
const { Stories } = require('./Stories');

const { Games } = require('./Games');
const { Categories, Games2Categories } = require('./Categories');
const { Reviews } = require('./Reviews');

module.exports = {
    Users,
    Stories,
    Games,
    Categories,
    Games2Categories,
    Reviews
};
