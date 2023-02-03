const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde o ping!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Ping: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
        await interaction.editReply({
            content: newMessage
        });
    }
}