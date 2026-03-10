const db = require('../config/connection');
const { DataTypes } = require('sequelize');

const Users = db.model('Users');
const Games = db.model('Games');

const Reviews = db.define(
    'Reviews',
    {
        review_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        created_by: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Users,
                key: 'user_id'
            }
        },
        fk_game_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Games,
                key: 'game_id'
            }
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        }
    },
    {
        tableName: 'reviews',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    }
);

Users.hasMany(Reviews, {
    foreignKey: 'created_by',
    as: 'reviews'
});

Reviews.belongsTo(Users, {
    foreignKey: 'created_by',
    as: 'author'
});

Games.hasMany(Reviews, {
    foreignKey: 'fk_game_id',
    as: 'reviews'
});

Reviews.belongsTo(Games, {
    foreignKey: 'fk_game_id',
    as: 'game'
});

module.exports = { Reviews };
