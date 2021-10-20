const db = require('../config/connection');
const { DataTypes } = require('sequelize');

const Games = db.model('Games');

const Categories = db.define(
    'Categories',
    {
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

const Games_Categories = db.define(
    'Games_Categories',
    {
        game_category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        fk_game_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Games,
                key: 'game_id'
            }
        },
        fk_category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Categories,
                key: 'category_id'
            }
        }
    },
    {
        tableName: 'games_categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Games.belongsToMany(Categories, {
    through: Games_Categories, // using our own join table
    foreignKey: 'fk_game_id',
    as: 'categories' // a game can have many categories
});

Categories.belongsToMany(Games, {
    through: Games_Categories, // using our own join table
    foreignKey: 'fk_category_id',
    as: 'games' // a category can have many games
});

module.exports = { Categories, Games_Categories };
