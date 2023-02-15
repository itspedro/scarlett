const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde Pong!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `Pong`
        await interaction.editReply({
            content: newMessage
        });
    }
}