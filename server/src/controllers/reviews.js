const { Reviews } = require('../models/Models');

module.exports.getAll = async (req, res, next) => {
    try {
        const results = await Reviews.findAll({
            include: [
                {
                    // model: Users,
                    // as: 'author',
                    association: 'author',
                    attributes: { exclude: ['password'] }
                },
                'game'
            ]
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
        const results = await Reviews.findOne({
            where: { review_id: req.params.rid },
            include: [
                {
                    // model: Users,
                    // as: 'author',
                    association: 'author',
                    attributes: { exclude: ['password'] }
                },
                'game'
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
        const { title, content, rating, created_by, fk_game_id } = req.body;

        const newReview = await Reviews.create({
            title, content, rating, created_by, fk_game_id
        });

        res.status(201).json({ results: { review_id: newReview.review_id } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.edit = async (req, res, next) => {
    try {
        const { title, content, rating } = req.body;

        const [rowsAffected, reviews] = await Reviews.update(
            { title, content, rating },
            { where: { review_id: req.params.rid } }
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
        const rowsDestroyed = await Reviews.destroy({
            where: { review_id: req.params.rid }
        });

        res.status(200).json({ results: { destroyed: rowsDestroyed } });
        return next();
    }
    catch (error) {
        return next(error);
    }
};
