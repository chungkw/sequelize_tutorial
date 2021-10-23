# One-to-Many Relationships

Now we want be able to post reviews on games as a user and games can also have many reviews.

There is a one-to-many relationship between Users and Reviews. There is also a one-to-many relationship between Games and Reviews.

For reviews, in [`Reviews.js`](../server/src/models/Reviews.js):

```js
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
        updatedAt: 'updated_at'
    }
);
```

For games, in [`Games.js`](../server/src/models/Games.js):

```js
const Games = db.define(
    'Games',
    {
        game_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(5, 2), // ie 999.99
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        tableName: 'games',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
```

## Relationship

The relationships would be:

In [`Reviews.js`](../server/src/models/Reviews.js):

```js
// users can have many reviews
Users.hasMany(Reviews, {
    foreignKey: 'created_by',
    as: 'reviews'
});

// each review has an author/user
Reviews.belongsTo(Users, {
    foreignKey: 'created_by',
    as: 'author'
});
```

```js
// games can have many reviews
Games.hasMany(Reviews, {
    foreignKey: 'fk_game_id',
    as: 'reviews'
});

// each review has a game
Reviews.belongsTo(Games, {
    foreignKey: 'fk_game_id',
    as: 'game'
});
```

## Querying this Relationship

It is also similar to one-to-one relationships.

### Create

If you want to create a user and their (many) reviews all at once:

```js
await Users.create({
    username: "vadim",
    email: "vadim@example.com",
    password: "hole_in_the_roof",
    reviews: [
        {
            fk_game_id: 1,
            title: "beautiful story",
            content: "a breathtaking and heartbreaking adventure",
            rating: 10
        },
        {
            fk_game_id: 2,
            title: "decent fun",
            content: "good enough graphics, at least it was cheap",
            rating: 6

        }
    ]
}, { include: "reviews" });
```

#### Multiple Includes

When you want to get a review, you would need to join data from two other models, the `Users` and `Games` models. To do so, you use an array.

In [`reviews.js`](../server/src/controllers/reviews.js):

```js
await Reviews.findAll({
    include: [
        {
            association : 'author',
            attributes: { exclude: ['password'] }
        },
        'game'
    ]
});
```
