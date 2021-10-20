const pc = require('picocolors');

module.exports.errorHandler = (error, req, res, next) => {
    console.log(pc.red(error));
    res.status(500).json({ error: error.message ?? error });
};
