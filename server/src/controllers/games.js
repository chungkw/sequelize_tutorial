const db = require('../config/connection');

const { Games, Games_Categories } = require('../models/Models');

module.exports.getAll = async (req, res, next) => {
    try {
        const results = await Games.findAll({
            include: {
                // model: Categories,
                // as: 'categories',
                association: 'categories',
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

module.exports.getById = async (req, res, next) => {
    try {
        const results = await Games.findOne({
            where: { game_id: req.params.gid },
            include: [
                {
                    // model: Categories,
                    // as: 'categories',
                    association: 'categories',
                    through: { attributes: [] }
                },
                'reviews'
            ]
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

        /*
        games will be undefined for mysql
        thus the following will not work

        const [rowsAffected, games] = await Games.update(
            { title, description, price, year },
            { where: { game_id: req.params.gid } }
        );

        if (categories.length > 0)
            await games[0].setCategories(categories);
        */

        const transaction = await db.transaction();
        let rowsAffected;
        try {
            [rowsAffected] = await Games.update(
                { title, description, price, year },
                { where: { game_id: req.params.gid }, transaction }
            );

            if (categories.length === 0) throw new Error('Not found');

            await Games_Categories.destroy({
                where: { fk_game_id: req.params.gid },
                transaction
            });

            await Games_Categories.bulkCreate(categories.map((category_id) => ({
                fk_game_id: req.params.gid,
                fk_category_id: category_id
            })), { transaction });

            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }

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
