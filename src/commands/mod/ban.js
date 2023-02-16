const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Da um ban.")
    .addUserOption((option) =>
      option
        .setName("nome")
        .setDescription("Quem vai ser banido")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Motivo para dar o ban.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("nome");
    let reason = interaction.options.getString("motivo");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Sem motivo."

    user.send({
        content:  `Você foi banido do: ${interaction.guild.name}\n Motivo: ${reason}`
    }).catch(console.log('DM off'));

    await member.ban({
        deleteMessageDays: 1,
        reason: reason,
    }).catch(console.error);

    await interaction.reply({
        content: `O usuário ${user.tag} foi banido.`
    });
  },
};
