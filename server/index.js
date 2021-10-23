const express = require('express');
const cors = require('cors');

const pc = require('picocolors');
const db = require('./src/config/connection');

const CONFIG = require('./src/config/config');
const mainRouter = require('./src/routes/main.routes');

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
    }
    catch (error) {
        console.log(pc.red('CONNECTION FAILED'), error);
        process.exit(1);
    }

    // seed the database with data
    if (reset) {
        try {
            console.log(pc.yellow('LOADING SEEDER'));
            const seeder = require('./src/database/seeder');

            console.log(pc.blue('RUNNING SEEDER'));
            await seeder();

            console.log(pc.green('FINISHED SEEDING'));
        }
        catch (error) {
            console.log(pc.red('ERROR SEEDING'), error);
        }
    }

    app.listen(CONFIG.port, () => {
        console.log(pc.blue(`SERVER IS READY ON PORT ${CONFIG.port}`));
    });
})();
