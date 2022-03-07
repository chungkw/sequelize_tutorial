const db = require('../config/connection');
const { Users, Stories, Reviews } = require('../models');

// i think the strings 'false' and '0' are the only weird ones
// because they get coerced as true
// https://www.samanthaming.com/tidbits/19-2-ways-to-convert-to-boolean/
const bool = (value) => value === 'false'
    ? false : value === '0'
        ? false : !!value;

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
            include: [
                {
                    // instead of the longer model/as properties,
                    // we can use the shorthand association 
                    // (its value what would have been the as property)
                    association: 'reviews',
                    include: {
                        association: 'game',
                        include: {
                            association: 'categories',
                            through: { attributes: [] }
                        }
                    }
                },
                'story'
            ]
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

        const [rowsAffected] = await Users.update(
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
        // create a transaction from the db connection
        var transaction = await db.transaction();

        const { uid } = req.params;
        const force = bool(req.query.force);

        const destroyUser = Users.destroy({
            where: { user_id: uid }, force, transaction
        });

        const destroyStory = Stories.destroy({
            where: { created_by: uid }, force, transaction
        });

        const destroyReviews = Reviews.destroy({
            where: { created_by: uid }, force, transaction
        });

        const destroyed = await Promise.all([destroyUser, destroyStory, destroyReviews]);

        // now that all changes are safe, we commit to them
        await transaction.commit();

        // this value is not going to be accurate
        const rowsDestroyed = destroyed.reduce((acc, cur) => acc += cur, 0);

        res.status(200).json({ results: { destroyed: rowsDestroyed } });
        return next();
    }
    catch (error) {
        // an error occured
        // we need to safely revert changes to our data
        await transaction.rollback();
        return next(error);
    }
};

// purposefully cause an error
module.exports.stupidDelete = async (req, res, next) => {
    try {
        // create a transaction from the db connection
        var transaction = await db.transaction();

        const { uid } = req.params;
        const force = bool(req.query.force);

        const destroyUser = Users.destroy({
            where: { user_id: uid }, force, transaction
        });

        const destroyStory = Stories.destroy({
            where: { created_by: uid }, force, transaction
        });

        const destroyReviews = Reviews.destroy({
            where: { created_by: uid }, force, transaction
        });

        // this rejection will always cause an error
        const rejection = new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('A useless rejection')), 1000);
        });

        const destroyed = await Promise.all([destroyUser, destroyStory, destroyReviews, rejection]);

        // now that all changes are safe, we commit to them
        await transaction.commit();

        // this value is not going to be accurate
        const rowsDestroyed = destroyed.reduce((acc, cur) => acc += cur, 0);

        res.status(200).json({ results: { destroyed: rowsDestroyed } });
        return next();
    }
    catch (error) {
        // an error occured
        // we need to safely revert changes to our data
        await transaction.rollback();
        return next(error);
    }
};

module.exports.restore = async (req, res, next) => {
    try {
        const { uid } = req.params;

        // bring back the user
        await Users.restore({
            where: { user_id: uid }
        });

        // bring back the user's story
        await Stories.restore({
            where: { created_by: uid }
        });

        // bring back the user's reviews
        await Reviews.restore({
            where: { created_by: uid }
        });

        res.status(200).json({});
        return next();
    }
    catch (error) {
        return next(error);
    }
};
