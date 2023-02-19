const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits  } = require("discord.js");
const Guild = require ('../../schemas/guild');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Da um kick em determinado usuário")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("nome")
        .setDescription("Quem vai ser kickado")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Motivo para dar o kick.")
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

    await member.kick(reason).catch(console.error);

    const embed =  new EmbedBuilder()
    .setTitle(`Punição!`)
    .setDescription(`O usuário **${user.tag}** foi **kickado**.`)
    .setColor(0x18e1ee)
    .setTimestamp()
    .addFields([
      {
        name: `Motivo`,
        value: `${reason}`,
        inline: true,
      }
    ]);

    channel.send({ embeds: [embed] });
    
    await interaction.reply({
      content: `O usuario ${user.tag} foi kickado.`,
      ephemeral: true
    });
  },
};
