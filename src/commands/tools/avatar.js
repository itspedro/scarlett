const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Responde o avatar de determinado membro")
    .addUserOption((option) => option
      .setName("nome")
      .setDescription("Nome do úsuario desejado")
      .setRequired(true)
    ),
  async execute(interaction, client) {

    const member = interaction.options.getUser('nome');

    const embed = new EmbedBuilder()
        .setTitle(`O avatar de **${member.username}`)
        .setImage(member.displayAvatarURL({ dynamic: true}))
        .setColor('Random')

    await interaction.Reply({

        embeds: [embed]

    });
  },
};
