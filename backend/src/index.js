const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-f4ebb.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

// Metodos HTTP: GET, POST, PUT, DELETE

// Tipos de Parâmetros:
// Query Params: request.query (Filtros, Ordenação, Paginação, ...)
// Route Params: request.params (Idendificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)
// console.log(request.query, request.params, request.body);

// MongoDB (Não-relacional)
