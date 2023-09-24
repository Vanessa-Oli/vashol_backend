const { body } = require("express-validator");

const errorMessages = {
    nome: "Nome é obrigatório",
    email: "E-mail inválido",
    senha: "Senha deve conter pelo menos 8 caracteres",
};

const userValidations = [
    body("nome").notEmpty().withMessage(errorMessages.nome),
    body("email").isEmail().withMessage(errorMessages.email),
    body("senha").isLength({ min: 8 }).withMessage(errorMessages.senha),
];

module.exports = userValidations;