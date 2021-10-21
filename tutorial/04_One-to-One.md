# One-to-One Relationships

Or as Sequelize calls it, associations.

Say that now our users each have one and only one story, so we want a relationship between a user and their story.

A new model definition is necessary, in [`Stories.js`](../server/src/models/Stories.js):

```js
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
                model: Users, // or "Users"
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
```

The `created_by` column is a foreign key column, which references the user model, either the model itself or the model alias.

## Relationship

The relationship between the two would be:

```js
Users.hasOne(Stories, {
    // the user can have only one story
    foreignKey: 'created_by', // the key that references Users in Stories
    as: 'story' // relationship alias
});

Stories.belongsTo(Users, {
    // the story has an author (who is the user)
    foreignKey: 'created_by',// the key that references Users in Stories
    as: 'author' // relationship alias
});
```

When a relationship has an alias, it must be queries with the alias.

**The second model in the relationship is where the foreign key is stored.** In this case, it is in the `Stories` model.

## Querying this Relationship

Largely similar to our queries in the previous chapter.

### Create

While creating a new user, you can also create a story as well.

```js
await Users.create({
    username: "boris",
    email: "boris@example.com",
    password: "kvass123",
    story: {
        title: "cheeki breeki cheburek",
        content: "how to make cheburek at your cousin's place"
    }
}, { include: "story" });
```

**Note that `created_at` (the foreign key column) is not necessary to fill.**

But you can also create them separately, then associate them. It is now however necessary to fill the `created_at` column.

```js
await Stories.create({
    created_by: 1 // user id
    title: "cheeki breeki cheburek",
    content: "how to make cheburek at your cousin's place",
});
```

### Read

Include the user's story:

```js
await Users.findAll({
    include: "story"
});
```

Or the opposite - include the story's author:

```js
await Stories.findAll({
    include: "author"
});
```

However, if you need to have query options on the include, it is a bit longer.

In [`stories.js`](../server/src/controllers/stories.js):

```js
await Stories.findAll({
    include: {
        model: Users,
        as: 'author',
        attributes: { exclude: ['password'] }
    }
});
```
