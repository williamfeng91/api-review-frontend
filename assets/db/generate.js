module.exports = function(){
    var faker = require("faker");
    var _ = require("lodash");
    return {
        review: _.times(10, function (n) {
            return {
                id: n,
                user: {
                  id: faker.random.number(),
                  name: faker.name.findName(),
                  avatar: faker.internet.url(),
                  email: faker.internet.email()
                },
                api: {
                  name: faker.commerce.productName()
                },
                review: faker.lorem.paragraphs(),
                created_at: faker.date.past(),
                rating: (faker.random.number()%5) + 1
            }
        })
    }
}
