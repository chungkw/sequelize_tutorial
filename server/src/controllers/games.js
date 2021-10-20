const { Games } = require('../models/Models');

module.exports.getAll = async (req, res, next) => {
    try {
        const results = await Games.findAll({
            include: 'categories'
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
        const results = await Games.findOne({
            where: { game_id: req.params.gid },
            include: ['categories', 'reviews']
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
        const {
            title,
            description,
            price,
            year,
            categories = []
        } = req.body;

        const newGame = await Games.create({
            title, description, price, year
        });

        if (categories.length > 0)
            await newGame.setCategories(categories);

        res.status(201).json({ results: { game_id: newGame.game_id } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.edit = async (req, res, next) => {
    try {
        const {
            title,
            description,
            price,
            year,
            categories = []
        } = req.body;

        const [rowsAffected, games] = await Games.update(
            { title, description, price, year },
            { where: { game_id: req.params.gid } }
        );

        if (categories)
            await games[0].setCategories(categories);

        res.status(200).json({ results: { changed: rowsAffected } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.delete = async (req, res, next) => {
    try {
        const rowsDestroyed = await Games.destroy({
            where: { game_id: req.params.gid }
        });

        res.status(200).json({ results: { destroyed: rowsDestroyed } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};
