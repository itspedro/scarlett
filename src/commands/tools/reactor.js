const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName('reactor')
        .setDescription('Reações'),
    async execute(interaction, client) {
        const message = await interaction.reply({
            content:`Funcionou :O 👍`,
            fetchReply: true
        });
        
        //const emoji = client.guilds.cache.emojis.find(emoji)

        message.react('👍');
    }
}