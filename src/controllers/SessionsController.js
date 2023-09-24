const SessionsCreateService = require("../services/SessionsCreateService");

class SessionsController {
    async store(request, response) {
        const { email, senha } = request.body;

        const { user, token } = await SessionsCreateService.execute({
            email,
            senha,
        });

        return response.status(201).json({ user, token });
    }
}

module.exports = SessionsController;