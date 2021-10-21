const { Users } = require('../models/Models');

module.exports.getAll = async (req, res, next) => {
    try {
        const results = await Users.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({ results });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const results = await Users.findOne({
            where: { user_id: req.params.uid },
            attributes: { exclude: ['password'] },
            include: 'reviews'
        });

        // same as
        // const results = await Users.findByPk(req.params.uid, {
        //     attributes: { exclude: ['password'] }
        // });

        res.status(200).json({ results });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.new = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const { user_id } = await Users.create({ username, email, password });

        res.status(201).json({ results: { user_id } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.edit = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // if the above variables are undefined and get passed to sequelize
        // those columns are ignored

        const [rowsAffected, users] = await Users.update(
            { username, email, password },
            { where: { user_id: req.params.uid } }
        );

        res.status(200).json({ results: { changed: rowsAffected } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.delete = async (req, res, next) => {
    try {
        const rowsDestroyed = await Users.destroy({
            where: { user_id: req.params.uid }
        });

        res.status(200).json({ results: { destroyed: rowsDestroyed } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};
