const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require('../../schemas/guild');
const bomDiaCron = require("../../utils/bomdia-cron");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bomdia")
    .setDescription("Seleciona canal e hora para mandar bom dia")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("chat")
        .setDescription("Chat desejado")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("horas")
        .setDescription("Horas desejada")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("minutos")
        .setDescription("Minutos desejado")
        .setRequired(true)
    ),

  async execute(interaction) {

    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
    const channelLog = interaction.guild.channels.cache.get(guildProfile.guildLog);

    const channel = interaction.options.getChannel("chat");
    let horas = interaction.options.getInteger("horas");
    let minutos = interaction.options.getInteger("minutos");

    const zeroPad = (num) => num.toString().padStart(2, '0');

    horas = zeroPad(horas);
    minutos = !minutos ? minutos = '00' : zeroPad(minutos);

    if (guildProfile.bomDiaConfig) {
      const { channel: channelID, horas: horasID, minutos: minutosID } = guildProfile.bomDiaConfig;
      const channelExists = interaction.guild.channels.cache.get(channelID);
      if (channelExists) {
        const response = `>>> O bom dia já está setado para o chat: ${channelExists}\nTodos os dias às: **${zeroPad(horasID)} Hrs e ${zeroPad(!minutosID ? '00' : minutosID)} Min.**`
        return interaction.reply({ content: response, ephemeral: true });
      };
    };

    guildProfile = await Guild.findOneAndUpdate(
      { guildId: interaction.guild.id },
      {
        bomDiaConfig: {
          channel: channel.id,
          horas,
          minutos
        }
      }, { new: true }
    );
    
    bomDiaCron(horas, minutos, channel);

    const response = `>>> O bom dia foi setado para o chat: ${channel}\nTodos os dias às: **${zeroPad(horas)} Hrs e ${zeroPad(!minutos ? '00' : minutos)} Min.**`

    const embedLog = new EmbedBuilder()
      .setTitle(`SET`)
      .setColor(0x00FF00)
      .setDescription(`O bom dia foi setado para o chat: ${channel}\nTodos os dias às: **${zeroPad(horas)} Hrs e ${zeroPad(!minutos ? '00' : minutos)} Min.**`)
      .setTimestamp();

    channelLog.send({ embeds: [embedLog] });

    await interaction.reply({
      content: response,
      ephemeral: true
    });
  },
};
