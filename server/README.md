# Environment

This application makes use of features found in NodeJS version 16, such as [`Array.at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

# Setup

1. Create a new database

    ```sql
    CREATE DATABASE IF NOT EXISTS `sequelize_tutorial`;
    ```

2. Create a `.env` file **in this folder** and provide the necessary credentials

    ```
    PORT=8080
    DB_HOST=localhost
    DB_NAME=sequelize_tutorial
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=
    ```

3. Start the application with the `npm run start`

# Project Folder Structure

A rough summary of what is inside `src`:

| Folder | Description |
| ------ | ----------- |
| config | variables from .env, database connector |
| controllers | request handlers |
| middlewares | to either perform checks such as auth, manipulate the request or error handling |
| models | sequelize models |
| routes | API endpoints |

Other folders you may want as you expand your application:

| Folder | Description |
| ------ | ----------- |
| constants | important variables that are used widely |
| errors | proprietary application errors |
| jobs | time/interval based tasks |
| services | functions that help to do something external, outside of the backend such as cloudinary |
| utils/helpers | extra functions that are used widely |
| validations | any kind of data validation, such as `validator` or `yup` |

# Barrel Exports

In the folders `models` and `routes`, a technique known as barrel export is used. A `index.js` file is in each folder and simply imports everything else from the folder, and re-exports them

Read more about it in `src/models/index.js`
