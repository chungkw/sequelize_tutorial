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
    "results": {
        "user_id": 1,
        "username": "Devon_Rosenbaum50",
        "email": "Moses_Koss@example.org",
        "created_at": "2021-10-22T22:32:47.000Z",
        "updated_at": "2021-10-22T22:32:47.000Z",
        "reviews": [
            {
                "review_id": 1,
                "created_by": 1,
                "fk_game_id": 2,
                "title": "Et consequatur temporibus et hic et in sed tempora aspernatur.",
                "content": "Rerum pariatur saepe. Corporis totam minima id amet. Eaque quia unde doloremque impedit deserunt. Inventore sed eligendi voluptatem id minima odit id autem alias.",
                "rating": 1,
                "created_at": "2021-10-22T22:32:47.000Z",
                "updated_at": "2021-10-22T22:32:47.000Z",
                "game": {
                    "game_id": 2,
                    "title": "Licensed Fresh Keyboard",
                    "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
                    "price": "199.00",
                    "year": 2021,
                    "created_at": "2021-10-22T22:32:47.000Z",
                    "updated_at": "2021-10-22T22:32:47.000Z",
                    "categories": [
                        {
                            "category_id": 1,
                            "name": "Classical",
                            "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
                            "created_at": "2021-10-22T22:32:47.000Z",
                            "updated_at": "2021-10-22T22:32:47.000Z"
                        },
                        {
                            "category_id": 7,
                            "name": "Blues",
                            "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
                            "created_at": "2021-10-22T22:32:47.000Z",
                            "updated_at": "2021-10-22T22:32:47.000Z"
                        }
                    ]
                }
            },
            {
                "review_id": 21,
                "created_by": 1,
                "fk_game_id": 20,
                "title": "Quo aut fuga est non qui.",
                "content": "Voluptas dolor vel. Facilis aut nihil ea ut consequuntur quae molestiae quis saepe. Est omnis aliquam perferendis in. Consectetur nihil incidunt et. Aut incidunt consequatur aut mollitia natus aspernatur quas ea. Et vel laboriosam quos enim dolores ut expedita tempora qui.",
                "rating": 1,
                "created_at": "2021-10-22T22:32:47.000Z",
                "updated_at": "2021-10-22T22:32:47.000Z",
                "game": {
                    "game_id": 20,
                    "title": "Licensed Soft Bike",
                    "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                    "price": "157.00",
                    "year": 2021,
                    "created_at": "2021-10-22T22:32:47.000Z",
                    "updated_at": "2021-10-22T22:32:47.000Z",
                    "categories": [
                        {
                            "category_id": 1,
                            "name": "Classical",
                            "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
                            "created_at": "2021-10-22T22:32:47.000Z",
                            "updated_at": "2021-10-22T22:32:47.000Z"
                        },
                        {
                            "category_id": 4,
                            "name": "Folk",
                            "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
                            "created_at": "2021-10-22T22:32:47.000Z",
                            "updated_at": "2021-10-22T22:32:47.000Z"
                        },
                        {
                            "category_id": 5,
                            "name": "Pop",
                            "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                            "created_at": "2021-10-22T22:32:47.000Z",
                            "updated_at": "2021-10-22T22:32:47.000Z"
                        }
                    ]
                }
            }
        ],
        "story": {
            "story_id": 1,
            "created_by": 1,
            "title": "Non quidem quo suscipit.",
            "content": "Inventore tempora omnis qui mollitia iusto. Qui et ut vel sint sunt. Architecto consequatur odit itaque soluta voluptatem doloribus. Pariatur enim excepturi veniam quia non. Ullam culpa dolor hic voluptatem quis.",
            "created_at": "2021-10-22T22:32:47.000Z",
            "updated_at": "2021-10-22T22:32:47.000Z"
        }
    }
}
```
