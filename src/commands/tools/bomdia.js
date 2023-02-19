const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const cron = require("cron");
const { API_KEY } = process.env;
const fetch = require("node-fetch");
const Guild = require ('../../schemas/guild');


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
      const horas = interaction.options.getInteger("horas");
      const minutos = interaction.options.getInteger("minutos");

      const zeroPad = (num) => num.toString().padStart(2, '0')

      const bomDia = new cron.CronJob({
        cronTime: `00 ${zeroPad(!minutos ? 00 : minutos)} ${zeroPad(horas)} * * *`,
        onTick: async() => {
  
        const url = `https://api.tenor.com/v2/search?q=bomdia&key=${API_KEY}`;
        const resposta = await fetch(url);
        const resultado = await resposta.json();
        const index = Math.floor(Math.random() * resultado.results.length);
        const gif = resultado.results[index].media_formats.gif.url
  
        const embed = new EmbedBuilder()
          .setTitle(`Bom Dia!`)
          .setColor(0x18e1ee)
          .setDescription(':point_up: Clique aqui se o gif não aparecer.')
          .setURL(gif)
          .setImage(gif)
          .setTimestamp();
  
        channel.send({embeds: [embed]});
      },
      timeZone: 'America/Sao_Paulo'
    });

    bomDia.start();
    console.log("Bom dia");

    const response = `>>> O bom dia foi setado para o chat: ${channel}\nTodos os dias às: **${zeroPad(horas)} Hrs e ${zeroPad(!minutos ? 00 : minutos)} Min.**`

    const embedLog = new EmbedBuilder()
    .setTitle(`SET`)
    .setColor(0x00FF00)
    .setDescription(`O bom dia foi setado para o chat: ${channel}\nTodos os dias às: **${zeroPad(horas)} Hrs e ${zeroPad(!minutos ? 00 : minutos)} Min.**`)
    .setTimestamp();

    channelLog.send({ embeds:[embedLog] });

    await interaction.reply({
      content: response,
      ephemeral: true
    });
  },
};
