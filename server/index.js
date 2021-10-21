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

(async function () {
    // sync the database to our models
    try {
        await db.sync({ force: reset });
        console.log(pc.green('SUCCESSFULLY SYNCED DB'));
    }
    catch (error) {
        console.log(pc.red('ERROR SYNCING DB'), error);
    }

    if (!reset) return;

    // seed the database with data
    try {
        console.log(pc.yellow('LOADING SEEDER'));
        const seeder = require('./src/database/seeder');

        console.log(pc.cyan('RUNNING SEEDER'));
        await seeder();
        console.log(pc.green('FINISH SEEDING'));
    }
    catch (error) {
        console.log(pc.red('ERROR SEEDING'), error);
    }
})();

app.listen(CONFIG.port, () => {
    console.log(pc.cyan(`SERVER IS READY ON PORT ${CONFIG.port}`));
});
