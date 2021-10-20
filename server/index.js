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

app.use(mainRouter);

(async function () {
    try {
        await db.sync({ force: false });
        console.log(pc.green('SUCCESSFULLY SYNCED DB'));
    }
    catch (error) {
        console.log(pc.red('ERROR SYNCING DB'), error);
    }
})();

app.listen(CONFIG.port, () => {
    console.log(pc.cyan(`SERVER IS READY ON PORT ${CONFIG.port}`));
});
