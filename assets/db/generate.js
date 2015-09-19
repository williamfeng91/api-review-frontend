module.exports = function(){
    var faker = require("faker");
    var _ = require("lodash");
    return {
        review: _.times(100, function (n) {
            return {
                id: n,
                user: {
                  id: faker.random.number(),
                  name: faker.name.findName(),
                  avatar: faker.internet.url(),
                  email: faker.internet.email()
                },
                review: faker.lorem.paragraphs(),
                created_at: faker.date.past(),
                rating: (n%5) + 1
            }
        })
    }
}
