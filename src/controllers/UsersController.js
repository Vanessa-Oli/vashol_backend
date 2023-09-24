const {validationResult} = require("express-validator");
const userValidations = require("../validations/userValidations");

const UserCreateService = require("../services/UserCreateService");

class UsersController {
    async create(request, response) {
        const {nome, email, senha, confirmaSenha, telefone, categoria} =
            request.body;

        await Promise.all(
            userValidations.map((validation) => validation.run(request))
        );

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }

        if (senha !== confirmaSenha) {
            return response
                .status(400)
                .json({errors: [{msg: "Senhas não conferem"}]});
        }

        await UserCreateService.execute({
            nome,
            email,
            senha,
            telefone,
            categoria,
        });

        return response
            .status(201)
            .json({message: "Usuário criado com sucesso!"});
    }


    async index(request, response) {
        const users = await UserCreateService.index();

        return response.status(200).json(users);
    }

    async show(request, response) {
        const {id} = request.params;

        const user = await UserCreateService.show({id});

        return response.status(200).json(user);
    }

    async delete(request, response) {
        const user_id = request.user.id;

        await UserCreateService.delete({id: user_id});

        return response
            .status(200)
            .json({message: "Usuário deletado com sucesso!"});
    }

    async update(request, response) {
        const user_id = request.user.id;
        const {
            nome,
            email,
            senha,
            senha_velha,
            telefone,
            categoria,
            descricao,
            bairro,
            cep,
        } = request.body;

        await UserCreateService.update({
            user_id,
            nome,
            email,
            senha,
            senha_velha,
            telefone,
            categoria,
            descricao,
            bairro,
            cep,
        });

        return response
            .status(200)
            .json({message: "Usuário atualizado com sucesso!"});
    }


}

module.exports = UsersController;