const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde a latencia do bot!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `Websocket heartbeat: ${client.ws.ping}ms.\nRoundtrip latency: ${message.createdTimestamp - interaction.createdTimestamp}ms.`
        await interaction.editReply({
            content: newMessage
        });
    }
}