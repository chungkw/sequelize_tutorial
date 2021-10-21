const {
    Users, Stories,
    Games, Categories, Reviews
} = require('../models/Models');

const faker = require('faker');

const seeder = async () => {
    const userInsertions = [];
    for (let i = 0; i < 20; i++)
        userInsertions.push({
            username: faker.internet.userName(),
            email: faker.internet.exampleEmail(),
            password: faker.internet.password(),
            story: {
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph()
            }
        });

    const users = await Users.bulkCreate(userInsertions, { include: 'story' });

    const categoryInsertions = [];
    for (let i = 0; i < 10; i++)
        categoryInsertions.push({
            name: faker.music.genre(),
            description: faker.commerce.productDescription()
        });

    const categories = await Categories.bulkCreate(categoryInsertions);

    const gameInsertions = [];
    for (let i = 0; i < 20; i++)
        gameInsertions.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Math.round(Math.random() * 200),
            year: 2021
        });

    const games = await Games.bulkCreate(gameInsertions);

    const setCategories = games.map((game) => {
        const c = new Set([
            categories.at(Math.random() * categories.length),
            categories.at(Math.random() * categories.length),
            categories.at(Math.random() * categories.length)
        ]);
        return game.setCategories([...c]);
    });

    await Promise.all(setCategories);

    const reviewInsertions = users.map((user) => ({
        created_by: user.user_id,
        fk_game_id: games.at(Math.random() * games.length).game_id,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        rating: Math.floor(Math.random() * 10)
    }));

    await Reviews.bulkCreate(reviewInsertions);
};

module.exports = seeder;
