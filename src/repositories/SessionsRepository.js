const knex = require("../database");

class SessionsRepository {
    async findUserByEmail(email) {
        const [user] = await knex("usuarios").where({email});
        return user;
    }
}

module.exports = new SessionsRepository();