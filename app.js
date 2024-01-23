const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/consultarCep', async (req, res) => {
    const cep = req.query.cep;  // Usar req.query para obter o parâmetro da consulta

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao consultar o CEP.' });
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
