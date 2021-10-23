# Many-to-Many Relationships

Previously, we created the `Games` model, but now we also want to be able to assign categories/game genres.

To do this, we need a many-to-many relationship.

Creating the new model, in [`Categories.js`](../server/src/models/Categories.js):

```js
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
```

## Join Tables

In a many-to-many relationship, data between two tables are joined by a join/junction/through table.

As such, we also need another model to represent this table, in [`Categories.js`](../server/src/models/Categories.js):

```js
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
```

## Relationship

The relationship between the two would be:

```js
Games.belongsToMany(Categories, {
    through: Games_Categories, // using our own join table
    foreignKey: 'fk_game_id', // if Categories store game_id's
    as: 'categories' // a game can have many categories
});

Categories.belongsToMany(Games, {
    through: Games_Categories, // using our own join table
    foreignKey: 'fk_category_id', // if Games store category_id's
    as: 'games' // a category can have many games
});
```

### Optional Singular and Plural

If you want to set your own singular/plural forms of the relationship alias, you can do the following:

```js
{ as: { singular: "game", plural: "games" } }
```

Sequelize itself should be able to determine the singular/plural forms of the alias on its own, however, you might prefer your own forms, be it your opinion or regional language.

## Querying this Relationship

For example, we have two games:

title | description | price | year
:--- | :--- | ---: | ---:
[Metro Exodus](https://store.steampowered.com/app/412020/Metro_Exodus/) | Flee the shattered ruins of the Moscow Metro and embark on an epic, continent-spanning journey across the post-apocalyptic Russian wilderness. | 53.90 | 2019
[Titanfall 2](https://store.steampowered.com/app/1237970/Titanfall_2/) | Combine & conquer with new titans & pilots, deadlier weapons, & customization and progression systems that help you and your titan flow as one unstoppable killing force. | 39.90 | 2016

And some categories: 

id | name | description 
---: | :--- | :---
1 | Adventure | Explore the world
2 | Post-Apocalyptic | Survive the aftermath world
3 | Action | Be up for the challenge
4 | Shooter | Use firearms to defeat your enemies

### Create

Do it all at once:

```js
const MetroExodus = await Games.create({
    title: "Metro Exodus",
    description: "Flee the shattered ruins of the Moscow Metro and embark on an epic, continent-spanning journey across the post-apocalyptic Russian wilderness.",
    price: 53.90,
    year: 2019,
    categories: [
        {
            name: "Adventure",
            description: "Explore the world"
        },
        {
            name: "Post-Apocalyptic",
            description: "Survive the aftermath world"
        },
        {
            name: "Action",
            description: "Be up for the challenge"
        }
    ]
}, { include: "categories" });
```

Do it separately:

```js
const MetroExodus = await Games.create({
    title: "Metro Exodus",
    description: "Flee the shattered ruins of the Moscow Metro and embark on an epic, continent-spanning journey across the post-apocalyptic Russian wilderness.",
    price: 53.90,
    year: 2019
});

const Adventure = await Categories.create({
    name: "Adventure",
    description: "Explore the world"
});

const PostApocalyptic = await Categories.create({
    name: "Post-Apocalyptic",
    description: "Survive the aftermath world"
});

const Action = await Categories.create({
    name: "Action",
    description: "Be up for the challenge"
});

// these methods below have names that are derived from the alias of the relationship
// Sequelize can determine singular/plural words

// add one category to the game
await MetroExodus.addCategory(Adventure);

// adds multiple categories to the game
await MetroExodus.addCategories([Adventure, PostApocalyptic, Action]);

// if you do not have an instance of category, you can also use its id in its place

// sets one or more categories to the game
// this will delete categories that were assigned from before
await MetroExodus.setCategories([1, 2, 3]);

// removes one category from the game
await MetroExodus.removeCategory(Adventure);

// removes multiple categories from the game
await MetroExodus.removeCategories([Adventure, PostApocalyptic]);
```

Full list of methods at [Sequelize Manual](https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances). Some methods above are also applicable on other relationships.

Or if you don't want to use any of these add/set methods, you can just create join rows on the join table yourself, i.e.:

```js
await Games_Categories.create({
    fk_game_id,
    fk_category_id
});
```

For the second game:

```js
const Titanfall2 = await Games.create({
    title: "Titanfall 2",
    description: "Combine & conquer with new titans & pilots, deadlier weapons, & customization and progression systems that help you and your titan flow as one unstoppable killing force.",
    price: 39.90,
    year: 2016
});

await Titanfall2.setCategories([3, 4]);
```

### Read

When reading many-to-many data, Sequelize will also get the data from the join table. If you don't want this, you can exclude columns from the join table.

In [`games.js`](../server/src/controllers/games.js):

```js
await Games.findAll({
    include: {
        association: 'categories',
        // Sequelize uses the term "through" for join tables
        through: { attributes: [] } // don't want any columns in the join table
    }
});
```
