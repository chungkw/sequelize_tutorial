# Complex Includes

Now that there are a few relationships going on, we can do a query like this, in [`users.js`](../server/src/controllers/users.js):

```js
await Users.findOne({
    where: { user_id },
    attributes: { exclude: ['password'] },
    include: [
        {
            model: Reviews,
            as: 'reviews',
            include: {
                model: Games,
                as: 'game',
                include: {
                    model: Categories,
                    as: 'categories',
                    through: { attributes: [] }
                }
            }
        },
        'story'
    ]
});
```

An example response from the server would be:

```json
{
    "user_id": 1,
    "username": "Dayton.Robel26",
    "email": "Doug_Kshlerin@example.org",
    "created_at": "2021-10-22T22:20:36.000Z",
    "updated_at": "2021-10-22T22:20:36.000Z",
    "reviews": [
        {
            "review_id": 1,
            "created_by": 1,
            "fk_game_id": 11,
            "title": "Eum fugit expedita quia non unde eum eveniet fuga.",
            "content": "Explicabo ut repellendus consequuntur. Eius a deserunt qui blanditiis rerum. Et non cumque laborum atque omnis recusandae nobis debitis.",
            "rating": 5,
            "created_at": "2021-10-22T22:20:36.000Z",
            "updated_at": "2021-10-22T22:20:36.000Z",
            "game": {
                "game_id": 11,
                "title": "Ergonomic Cotton Bike",
                "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
                "price": "113.00",
                "year": 2021,
                "created_at": "2021-10-22T22:20:36.000Z",
                "updated_at": "2021-10-22T22:20:36.000Z",
                "categories": [
                    {
                        "category_id": 2,
                        "name": "Folk",
                        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
                        "created_at": "2021-10-22T22:20:36.000Z",
                        "updated_at": "2021-10-22T22:20:36.000Z"
                    },
                    {
                        "category_id": 3,
                        "name": "Metal",
                        "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
                        "created_at": "2021-10-22T22:20:36.000Z",
                        "updated_at": "2021-10-22T22:20:36.000Z"
                    },
                    {
                        "category_id": 7,
                        "name": "Metal",
                        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
                        "created_at": "2021-10-22T22:20:36.000Z",
                        "updated_at": "2021-10-22T22:20:36.000Z"
                    }
                ]
            }
        }
    ],
    "story": {
        "story_id": 1,
        "created_by": 1,
        "title": "Id sit qui hic enim qui adipisci dignissimos.",
        "content": "Velit tempora qui in sunt qui. Sit sapiente atque assumenda sed dolor voluptatem unde sequi. Modi ut pariatur et aut.",
        "created_at": "2021-10-22T22:20:36.000Z",
        "updated_at": "2021-10-22T22:20:36.000Z"
    }
}
```
