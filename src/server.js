require("express-async-errors");
const AppError = require("./utils/AppError");
const express = require("express");
require("dotenv").config();
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(routes);

app.use((erro, request, response, next) => {
    if (erro instanceof AppError) {
        return response.status(erro.statusCode).json({
            status: "error",
            message: erro.message,
        });
    }

    console.error(erro);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.log(`Server Vashol listening on port ${PORT}`);
});