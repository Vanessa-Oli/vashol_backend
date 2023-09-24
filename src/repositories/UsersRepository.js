const knex = require("../database");
const USERS_TABLE = "usuarios";

class UsersRepository {
    async findByEmailOrNome(email, nome) {
        const user = await knex(USERS_TABLE)
            .where({ email })
            .orWhere({ nome })
            .first();
        return user;
    }

    async findByEmail(email) {
        const user = await knex(USERS_TABLE).where({ email }).first();
        return user;
    }


    async create({ nome, email, senha }) {
        const user = await knex(USERS_TABLE).insert({
            nome,
            email,
            senha,
        });
        return user;
    }
    async index() {
        const users = await knex(USERS_TABLE).select("*");
        return users;
    }

    async show(id) {
        const user = await knex(USERS_TABLE).where({ id }).first();
        return user;
    }

    async delete(id) {
        const user = await knex(USERS_TABLE).where({ id }).delete();
        return user;
    }

    async update(id, user) {
        const userUpdated = await knex(USERS_TABLE).where({ id }).update(user);
        return userUpdated;
    }
}

module.exports = new UsersRepository();