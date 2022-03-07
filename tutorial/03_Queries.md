# Queries

Now that we have a working model, we can begin querying the database. Typical CRUD operations - create, read, update and destroy.

## Create

To create a new row of data, we can use the `create` method on the model.

```js
const newlyCreatedUser = await Users.create({ 
    username: "ivan",
    email: "ivan@example.com",
    password: "badpassword"
});
```

It will return a new instance of the model to represent that row data.

### Create Many

If you have a lot of data to insert at once, you can use the `bulkCreate` method. It works by taking an array of objects which represents data in a row.

In [`seeder.js`](../server/src/database/seeder.js):

```js
// an array to store our data
const userInsertions = [];

// create 20 new users
// add each row of data to the array
for (let i = 0; i < 20; i++) userInsertions.push({ username, email, password });

// create a lot of users
const users = await Users.bulkCreate(userInsertions);
```

It will return an array of model instances to represent each user.

## Read

To read data from a table, we can use the `findAll` method on the model.

In [`users.js`](../server/src/controllers/users.js):

```js
const users = await Users.findAll({
    attributes: { exclude: ['password'] }
});
```

It will return an array of model instance to represent each row of the table.

We also see the `attributes` option here, which can be used to either include or exlude specific columns. Here, we excluded the password column from our query.

To include columns in the query:

```js
{ attributes: { include: ["username", "email"] } }
// or shorter
{ attributes: ["username", "email"] }
```

To select a column "as":

```js
// selects username as name
{ attributes: [["username", "name"], "email"] }
```

### Other Read Methods

The model also has other methods to find one row of data easier, they are `findOne` and `findByPk` (primary key).

For example, we want to find a user by their id:

```js
// array destructuring used to get the first item in the returned array
const [user] = await User.findAll({
    where: { user_id },
    limit: 1, // not necessary to have
    attributes: { exclude: ['password'] }
});

// same as

const user = await User.findOne({
    where: { user_id },
    attributes: { exclude: ['password'] }
});

// same as

// query options are now in the 2nd arguement
const user = await User.findByPk(user_id, {
    attributes: { exclude: ['password'] }
});
```

## Update

To update data in a table, we can use the `update` method.

In [`users.js`](../server/src/controllers/users.js):

```js
// you wont see users in the source code
const [rowsAffected, users] = await Users.update(
    { username, email, password },
    { where: { user_id } }
);
```

The above will update any rows where the `user_id` matches, which can only be one.

The method returns an array, where the first item is the number of rows where data has been affected and the second item is an array of model instances that represents the affected rows (PostgreSQL only feature). Since we are using MySQL, `users` is undefined.

### Updating a Model Instance

If you already have a model instance and you want to update the row it represents, you also call the `update` method on it.

```js
const updatedUser = await existingUser.update({
    email: "newemail@example.com"
});
```

## Delete

To delete data, we can use the `destroy` method.

In [`users.js`](../server/src/controllers/users.js):

```js
const rowsDestroyed = await Users.destroy({
    where: { user_id }
});
```

The method returns the number of rows that have been deleted.

### Deleting a Model Instance

If you already have a model instance and you want to delete the row it represents, you also can call the `destroy` method on it.

```js
await user.destroy();
```
