const { Games, Categories } = require('../models/Models');

module.exports.getAll = async (req, res, next) => {
    try {
        const results = await Categories.findAll();

        res.status(200).json({ results });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const results = await Categories.findOne({
            where: { category_id: req.params.cid },
            include: {
                model: Games,
                as: 'games',
                through: { attributes: [] }
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
        const { name, description } = req.body;

        const newCategory = await Categories.create({
            name, description
        });

        res.status(201).json({ results: { category_id: newCategory.category_id } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.edit = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const [rowsAffected, categories] = await Categories.update(
            { name, description },
            { where: { category_id: req.params.cid } }
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
        const rowsDestroyed = await Categories.destroy({
            where: { category_id: req.params.cid }
        });

        res.status(200).json({ results: { destroyed: rowsDestroyed } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};
