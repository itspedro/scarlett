const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName('catfact')
        .setDescription('Responde um fato aleatório sobre gato!'),
    async execute(interaction) {
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