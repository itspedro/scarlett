const { EmbedBuilder } = require("discord.js");
const { API_KEY } = process.env;
const cron = require("cron");

async function bomDiaCron(horas, minutos, channel) {
  const bomDia = new cron.CronJob({
    cronTime: `00 ${!minutos ? '00' : minutos} ${horas} * * *`,
    onTick: async() => {

    const url = `https://tenor.googleapis.com/v2/search?q=bomdia&key=${API_KEY}`;
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
};

module.exports = bomDiaCron;