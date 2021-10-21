# Sequelize Models

In Sequelize, a model is defined to represent a table in the database. An instance of a model thus represents a row in a database table.

Sequelize models are classes and should be in PascalCase and model instances are in camelCase.

## Data Types

In Sequelize, the data types you need are in `DataTypes`.

```js
const { DataTypes } = require('sequelize');

// examples
DataTypes.INTEGER
DataTypes.INTEGER.UNSIGNED // no negatives

DataTypes.DECIMAL(5, 2)
// a number with 5 digits, of which 2 are behind the decimal point
// ie 123.45

DataTypes.STRING // default length of 255
DataTypes.STRING(512) // your own length
DataTypes.TEXT

// and if you cant find one to use
// use a string
"timestamp"
```

## Model Definition

Now that you are able describe a column's data type for use in Sequelize, you can now start defining models.

In [`Users.js`](../server/src/models/Users.js):

```js
const Users = db.define(
    'Users', // model alias
    {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true, // primary key of the table
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'users', // the actual name of the table in the database
        timestamps: true, // enable timestamps for created at and updated at, managed by sequelize
        createdAt: 'created_at', // name of the created at column
        updatedAt: 'updated_at' // name of the updated at column
    }
);
```

From here we see that the `define` method has three arguements:

```js
db.define(modelAlias, columns, options);
```

- Model alias is a string used to identify this model
- Columns of the model in an object literal, where each column can have some properties
- Table options in an object literal
