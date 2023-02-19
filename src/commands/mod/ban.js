const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require ('../../schemas/guild');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Da um ban em determinado usuário")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("nome")
        .setDescription("Quem vai ser banido")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Motivo para dar o ban.")
    ),
  async execute(interaction) {

    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id});
    const channel = interaction.guild.channels.cache.get(guildProfile.guildLog);


    const user = interaction.options.getUser("nome");
    let reason = interaction.options.getString("motivo");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Sem motivo."

      const embed =  new EmbedBuilder()
      .setTitle(`Punição!`)
      .setDescription(`O usuário **${user.tag}** foi **Banido**.`)
      .setColor(0x18e1ee)
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp()
      .addFields([
        {
          name: `Motivo`,
          value: `${reason}`,
          inline: true,
        }
      ]);

    channel.send({ embeds: [embed] });

    await member.ban({
        deleteMessageDays: 1,
        reason: reason,
    }).catch(console.error);

    
    await interaction.reply({
        content: `O usuário ${user.tag} foi banido.`,
        ephemeral: true,
    });
  },
};
