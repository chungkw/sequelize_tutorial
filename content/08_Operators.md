# [Operators](https://sequelize.org/master/manual/model-querying-basics.html#operators)

Operators are used while querying. To use it, import it from Sequelize.

```js
const { Op } = require("sequelize");
```

## Some Examples

The OR operator on a column:

```js
await Categories.findAll({
    where: {
        name: {
            // select categories which have these names
            // they must match exactly
            [Op.or]: ["Adventure", "Post-Apocalyptic"]
        }
    }
});
```

The OR operator on multiple columns:

```js
await Reviews.findAll({
    where: {
        // finds reviews which are created by a specific user or of a specific game
        [Op.or]: [{ created_by: user_id }, { fk_game_id: game_id }]
    }
});
```

The IN operator is basically many OR operators, for example, you want to find users with the ids of 1, 2, 9:

```js
await Users.findAll({
    where: {
        user_id: {
            [Op.in]: [1, 2, 9]
        }
    }
});
```
