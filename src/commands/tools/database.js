const Guild = require ('../../schemas/guild');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const guild = require('../../schemas/guild');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName('registrar')
        .setDescription('Reponde as informações do sv no DB!'),

    async execute(interaction, client) {
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id })
        if(!guildProfile){ guildProfile = await new Guild({ 
            _id: mongoose.Types.ObjectId(),
            guildId: interaction.guild.id,
            guildName: interaction.guild.name,
            guildIcon: interaction.guild.iconURL() ?  interaction.guild.iconURL() : 'none'
        })  ;
        
        await guild.Profile.save().catch(console.error);
        await interaction.reply({
            content: `Nome do Server: ${guildProfile.guildName}`
        });
        console.log(guildProfile);
        } else {
            await interaction.reply({
                content: `Server ID: ${guildProfile.guildId}`
            });
        console.log(guildProfile);
        }
    },
};