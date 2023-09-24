const {hash, compare} = require("bcryptjs");
const AppError = require("../utils/AppError");
const UsersRepository = require("../repositories/UsersRepository");

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({nome, email, senha}) {
        const checkUserExists = await this.userRepository.findByEmailOrNome(
            email,
            nome,
        );

        if (checkUserExists) {
            if (checkUserExists.email === email) {
                throw new AppError("Este e-mail já está em uso.", 400);
            }
        }

        const hashedPassword = await hash(senha, 8);

        await this.userRepository.create({
            nome,
            email,
            senha: hashedPassword,
        });
    }

    async delete({id}) {
        await this.userRepository.delete(id);
    }

    async index() {
        const users = await this.userRepository.index();
        return users;
    }

    async show({id}) {
        const user = await this.userRepository.show(id);

        if (!user) {
            throw new AppError("Usuário não encontrado.", 400);
        }

        return user;
    }

    async update({
                     user_id: id,
                     nome,
                     email,
                     senha,
                     senha_velha,
                 }) {
        const user = await this.userRepository.show(id);

        if (!user) {
            throw new AppError("Usuário não encontrado.", 400);
        }

        if (email) {
            const checkEmailExists = await this.userRepository.findByEmail(email);

            if (checkEmailExists) {
                throw new AppError("Este e-mail já está em uso.", 400);
            }
        }
        if (senha) {
            if (!senha_velha) {
                throw new AppError(
                    "Você precisa informar a senha antiga para definir a nova senha.",
                    400
                );
            }
            const checkOldPassword = await compare(senha_velha, user.senha);

            if (!checkOldPassword) {
                throw new AppError("Senha antiga incorreta.", 400);
            }
            const hashedPassword = await hash(senha, 8);

            user.senha = hashedPassword;
        }

        user.nome = nome ?? user.nome;
        user.email = email ?? user.email;
        user.data_atualizacao = new Date();

        await this.userRepository.update(id, user);
    }
}

module.exports = new UserCreateService(UsersRepository);