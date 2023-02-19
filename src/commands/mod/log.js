const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const Guild = require ('../../schemas/guild');
const mongoose = require('mongoose');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log")
    .setDescription("Seta o chat para mostrar logs.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option.setName("chat").setDescription("Chat desejado").setRequired(true)
    ),

  async execute(interaction) {

    const chat = interaction.options.getChannel("chat");
    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id })
    if(!guildProfile){ guildProfile = new Guild({ 
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL() ?  interaction.guild.iconURL() : 'none',
        guildLog: chat.id
    });
    
    await guildProfile.save().catch(console.error);


    await interaction.reply({
        content: `Os **logs** foram setados para o chat: ${chat}`
      });

    } else {

        const embed = new EmbedBuilder()
        .setTitle(`Server logs no Banco de dados`)
        .setDescription(`Server: **${guildProfile.guildName}**`)
        .setColor(0x18e1ee)
        .setThumbnail(guildProfile.guildIcon != 'none' ? guildProfile.guildIcon : 'https://via.placeholder.com/150' )
        .setTimestamp()
        .addFields([
            {
              name: `Log chat ID:`,
              value: `${guildProfile.guildLog}`,
              inline: false,
            },
            {
              name: `ID do servidor:`,
              value: `${guildProfile.guildId}`,
              inline: false
            }
          ]);
          

        await interaction.reply({
            embeds: [embed]
        });
    }
  },
};
