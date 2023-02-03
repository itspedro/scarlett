const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Da um Timeout.")
    .addUserOption((option) =>
      option
        .setName("nome")
        .setDescription("Quem vai ser mutado.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("tempo")
        .setDescription("O tempo em minutos que vai ser o timeout.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Motivo para dar o Timeout.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("nome");
    let reason = interaction.options.getString("motivo");
    let time = interaction.options.getInteger("tempo");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Sem motivo.";

    user
      .send({
        content: `Você foi mutado do: ${interaction.guild.name}\nMotivo: ${reason}`,
      })
      .catch(console.log("DM off"));

    await member.timeout(time * 60 * 1000, reason).catch(console.error);

    const embed =   new EmbedBuilder()
    .setTitle(`Punição!`)
    .setDescription(`O usuario **${user.tag}** foi **mutado**.`)
    .setColor(0x18e1ee)
    .setThumbnail(user.displayAvatarURL())
    .setTimestamp(Date.now())
    .addFields([
      {
        name: `Tempo`,
        value: `${time} Minuto(s)`,
        inline: true,
      },
      {
        name: `Motivo`,
        value: `${reason}`,
        inline: true
      }
    ]);
    

    await interaction.reply({
      embeds: [embed],
      //content: `O usuario ${user.tag} foi mutado por ${time} minutos\nMotivo: ${reason}`,
    });
  },
};


