const fs = require('fs');
const path = require('path');

const pathToDocs = path.resolve(__dirname, '../tutorial');
const docs = fs.readdirSync(pathToDocs);
const sidebar = docs.map((doc) => `/tutorial/${doc}`);

module.exports = {
    lang: 'en-UK',
    title: 'Sequelize Tutorial',
    port: 1234,
    themeConfig: {
        navbar: [{
            text: 'GitHub',
            link: 'https://github.com/chungkw/sequelize_tutorial'
        }],
        sidebar,
        contributors: false
    },
    // only scan for the README and files in the tutorial folder
    pagePatterns: [
        './README.md',
        './tutorial/*.md'
    ]
};
