# Setup

[[toc]]

In this tutorial, Sequelize will be used with MySQL.

To begin, make sure you have a database ready to use.

```sql
CREATE DATABASE IF NOT EXISTS `sequelize_tutorial`;
```

Then, in a project, install Sequelize and the necessary libraries.

```
npm i sequelize mysql2
```

## Structure

You can see the demo server in this [repo](https://github.com/chungkw/sequelize_tutorial/tree/main/server).

## Configurations

You should use a `.env` file to store your database login credentials.

Create a `.env` file in the root project folder.

```
PORT=8080
DB_HOST=
DB_NAME=sequelize_tutorial
DB_PORT=
DB_USER=
DB_PASSWORD=
```

## Connecting to the Database

Having set your credentials in `.env`, you should have a config file that gets those credentials from the `.env` file.

In [`config/index.js`](../server/src/config/index.js):

```js
require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};
```

With these credentials, we can now create a new connection with Sequelize to the database.

In [`connection.js`](../server/src/config/connection.js):

```js
const { Sequelize } = require('sequelize');
const { name, user, password, host, port } = require('./config').db;

const db = new Sequelize(name, user, password, {
    host, port, dialect: 'mysql'
});

module.exports = db;
```

## Models Syncing

In the project entry file, we can get Sequelize to sync our database tables with the models we define.

In [`index.js`](../server/index.js):

```js{7-8}
// immediately invoked function here to use async/await
(async function main() {
    try {
        // connect to database
        await db.authenticate();

        // sync the database to our models
        await db.sync(/* options */);
    }
    catch (error) {
        // fail
    }

    // ...
})();
```
