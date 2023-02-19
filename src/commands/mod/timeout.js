const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require ('../../schemas/guild');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("silenciar")
    .setDescription("Da um Timeout.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("nome")
        .setDescription("Quem vai ser silenciado.")
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
  async execute(interaction) {

    // let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });

    // const channel = guildProfile.findOne(ch => ch.id === interaction.guild.channels);
    const user = interaction.options.getUser("nome");
    let reason = interaction.options.getString("motivo");
    let time = interaction.options.getInteger("tempo");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Sem motivo.";

    await member.timeout(time * 60 * 1000, reason).catch(console.error);
    

    user.send({
        content: `Você foi silenciado do: ${interaction.guild.name}\nMotivo: ${reason}`,
      })
      .catch(console.log("DM off"));

    const embed =  new EmbedBuilder()
    .setTitle(`Punição!`)
    .setDescription(`O usuário **${user.tag}** foi **silenciado**.`)
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


    // channel.send({ embeds: [embed]});
  
    await interaction.reply({
      embeds: [embed]
    });
  },
};


