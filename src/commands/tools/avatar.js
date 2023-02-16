const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Responde o avatar de determinado membro")
    .addUserOption((option) => 
        option
        .setName("nome")
        .setDescription("Nome do usuário desejado")
    ),
  async execute(interaction, client) {

    const member = interaction.options.getUser('nome');

    const embed = new EmbedBuilder()
        .setTitle(member ? `O avatar de **${member.username}**` : `O avatar de **${interaction.user.username}**`)
        .setImage(member ? member.displayAvatarURL({ dynamic: true, size: 512}) : interaction.user.displayAvatarURL({ dynamic: true, size: 512}))
        .setColor('Random')
        .setFooter({ 
            text: `Executado por: ${interaction.user.tag}`, 
            iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp()

    await interaction.reply({
        fetchReply: true,
        embeds: [embed]

    });
  },
};
