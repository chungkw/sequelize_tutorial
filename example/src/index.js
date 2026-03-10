const express = require('express');
const cors = require('cors');

const pc = require('picocolors');
const db = require('./config/connection');

const CONFIG = require('./config');
const mainRouter = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CONFIG.cors));

app.use('/api', mainRouter);

const reset = true;

// immediately invoked function here to use async/await
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async function main() {
    try {
        // connect to database
        await db.authenticate();
        console.log(pc.green('CONNECTED TO DATABASE SUCCESSFULLY'));

        // sync the database to our models
        await db.sync({ force: reset });
        console.log(pc.green('SYNCED DB SUCCESSFULLY'));

        // seed the database with data
        if (reset) {
            console.log(pc.yellow('LOADING SEEDER'));
            const seeder = require('./database/seeder');

            console.log(pc.blue('RUNNING SEEDER'));
            await seeder();

            console.log(pc.green('FINISHED SEEDING'));
        }

        app.listen(CONFIG.port, () => {
            console.log(pc.blue(`SERVER IS READY ON PORT ${CONFIG.port}`));
        });
    }
    catch (error) {
        console.log(pc.red('SERVER FAILED TO START'), error);
        process.exit(1);
    }
})();
