const AppError = require("../utils/AppError");
const SessionsRepository = require("../repositories/SessionsRepository");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsCreateService {
    constructor(sessionsRepository) {
        this.sessionsRepository = sessionsRepository;
    }

    async execute({ email, senha }) {
        const user = await this.checkEmail(email);

        await this.checkPassword(senha, user);

        const token = await this.createToken(user);

        return { user, token };
    }

    async checkEmail(email) {
        const user = await this.sessionsRepository.findUserByEmail(email);

        if (!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }
        return user;
    }

    async checkPassword(senha, user) {
        const passwordMatched = await compare(senha, user.senha);

        if (!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }
    }

    async createToken(user) {
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id.toString(),
        });

        return token;
    }
}

module.exports = new SessionsCreateService(SessionsRepository);