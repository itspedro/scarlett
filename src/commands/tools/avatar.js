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

    const user = interaction.getUser('nome');
    const member = interaction.options.getUser('nome')

    const embed = new EmbedBuilder()
        .setAuthor(user.displayAvatarURL())
        .setTitle('Avatar')
        .setDescription(`O avatar de **${member.userName}**`)
        .setImage(member.displayAvatarURL({ dynamic: true}))

    await interaction.Reply({

        embeds: [embed]

    });
  },
};
