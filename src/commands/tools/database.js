const Guild = require ('../../schemas/guild');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName('registrar')
        .setDescription('Reponde o registro do DB!'),
    async execute(interaction, client) {
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id })
    },
};