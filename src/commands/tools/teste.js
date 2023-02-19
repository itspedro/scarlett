const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const cron = require("cron");
const { API_KEY } = process.env;
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("teste")
    .setDescription("teste!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction) {

      const channel = interaction.options.getChannel("chat");
      const horas = interaction.options.getInteger("horas");
      const minutos = interaction.options.getInteger("minutos");
      const zeroPad = (num) => num.toString().padStart(2, '0')

      const bomDia = new cron.CronJob({
        cronTime: `00 ${zeroPad(!minutos ? 00 : minutos)} ${zeroPad(horas)} * * *`,
        onTick: async() => {
  
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=bomdia&limit=25&offset=0&rating=g&lang=pt`;
        const resposta = await fetch(url);
        const resultado = await resposta.json();
        const index = Math.floor(Math.random() * resultado.data.length);
        const gif = `https://media4.giphy.com/media/${resultado.data[index].id}/giphy.gif?&rid=giphy.gif`
  
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

    await interaction.reply({
      content: response,
      ephemeral: true
    });
  },
};
