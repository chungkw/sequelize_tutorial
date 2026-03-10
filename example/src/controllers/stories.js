const { Stories } = require('../models');

module.exports.getAll = async (req, res, next) => {
    try {
        const results = await Stories.findAll({
            // we can use the relation ship alias here for a simple join query
            // include: 'author'

            // we can also make a join query like this
            // this allows for more complex queries
            include: {
                // model: Users,
                // as: 'author',
                association: 'author',
                // in the join query, dont want the user password
                attributes: { exclude: ['password'] }
            }
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
        const results = await Stories.findOne({
            where: { story_id: req.params.sid },
            include: {
                // model: Users,
                // as: 'author',
                association: 'author',
                attributes: { exclude: ['password'] }
            }
        });

        res.status(200).json({ results });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.new = async (req, res, next) => {
    try {
        const { created_by, title, content } = req.body;

        const { story_id } = await Stories.create({ created_by, title, content });

        res.status(201).json({ results: { story_id } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.edit = async (req, res, next) => {
    try {
        // if you destructured undefined, likely created_by
        const { created_by, title, content } = req.body;

        const [rowsAffected] = await Stories.update(
            // and used undefined in here,
            // sequelize will ignore the value
            { created_by, title, content },
            { where: { story_id: req.params.sid } }
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
        const rowsDestroyed = await Stories.destroy({
            where: { story_id: req.params.sid }
        });

        res.status(200).json({ results: { destroyed: rowsDestroyed } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

