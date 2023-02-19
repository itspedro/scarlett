const { SlashCommandBuilder } = require('discord.js');
const fetch = require("node-fetch");
//const axios = require('axios');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName('catfact')
        .setDescription('Responde um fato aleatório sobre gato!'),
    async execute(interaction) {
        // const fact = await axios.get('https://meowfacts.herokuapp.com/?lang=por-br')
        //     .then((res) => {
        //         res.data.data[0]
        //     })
        const url = `https://meowfacts.herokuapp.com/?lang=por-br`;
        const resposta = await fetch(url);
        const resultado = await resposta.json();
        console.log(resultado);
        const fact = resultado.data[0];
        const message = `${fact}`

        await interaction.reply({
            content: message
        });
    }
}