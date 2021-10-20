const db = require('../config/connection');
const { DataTypes } = require('sequelize');

const Users = db.model('Users');

const Stories = db.define(
    'Stories',
    {
        story_id: {
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
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: 'stories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Users.hasOne(Stories, {
    // the user has one story
    foreignKey: 'created_by', // the key that references Users in Stories
    as: 'story' // relationship alias
});

Stories.belongsTo(Users, {
    // the story has an author (who is the user)
    foreignKey: 'created_by',// the key that references Users in Stories
    as: 'author' // relationship alias
});

// this one to one r/s example can also easily become a one to many
// where the user has many stories
// by using Users.hasMany on line 39

module.exports = { Stories };
