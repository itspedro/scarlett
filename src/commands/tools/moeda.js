const { SlashCommandBuilder, EmbedBuilder, Attachment, AttachmentBuilder } = require("discord.js");
const fetch = require("node-fetch");
const { createCanvas, loadImage } = require('canvas')


module.exports = {
  data: new SlashCommandBuilder()
    .setName("cotacao")
    .setDescription("Mostra a cotação atual de determinada moeda.")
    .addStringOption((option) =>
      option
        .setName("moeda1")
        .setDescription("A moeda a ser cotada.")
        .setRequired(true)
        .addChoices(
          { name: "BRL", value: "BRL" },
          { name: "ARS", value: "ARS" },
          { name: "USD", value: "USD" },
          { name: "TRY", value: "TRY" },
          { name: "BTC", value: "BTC" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("moeda2")
        .setDescription("A moeda a ser cotada.")
        .setRequired(true)
        .addChoices(
          { name: "BRL", value: "BRL" },
          { name: "ARS", value: "ARS" },
          { name: "USD", value: "USD" },
          { name: "TRY", value: "TRY" },
          { name: "BTC", value: "BTC" }
        )
    ),
  async execute(interaction) {
    let moeda1 = interaction.options.getString("moeda1");
    let moeda2 = interaction.options.getString("moeda2");
    const url = `https://economia.awesomeapi.com.br/last/${moeda1}-${moeda2}`;
    const resposta = await fetch(url);
    const resultado = await resposta.json();
    const valor = parseFloat(resultado[`${moeda1}${moeda2}`].bid).toFixed(2);
    const variacaoPor = parseFloat(resultado[`${moeda1}${moeda2}`].pctChange).toFixed(2);
    const variacao = parseFloat(resultado[`${moeda1}${moeda2}`].varBid).toFixed(2);

    const canvas = createCanvas(800, 500);
    const context = canvas.getContext('2d');
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "white";
    context.font = "bold 32px Arial";
    context.textBaseline = "hanging";
    context.fillText(`Últimos 15 dias`, 15, 15);

    context.fillStyle = "#808080";
    context.fillRect(10,100, canvas.width -20, 5)

    context.fillStyle = "white";
    context.font = "bold 32px Arial";
    context.textBaseline = "hanging";
    context.fillText(`${valor}`, 20, 110);
    const valorWidth = context.measureText(`${valor}`).width;

    context.fillStyle = variacao < 0 ? "red" : "green";
    context.font = "bold 32px Arial";
    context.textBaseline = "hanging";
    context.fillText(`${variacao}(${variacaoPor}%)`, 45 + valorWidth, 110);

    const urlGrafico = `https://economia.awesomeapi.com.br/json/daily/${moeda1}-${moeda2}/15`;
    const res = await fetch(urlGrafico);
    const grafico = await res.json();
    const highOfDay = Math.max(grafico[0].high);
    const lowOfDay = Math.min(grafico[0].low);
    const range = highOfDay - lowOfDay;

    let previousHeight = ((grafico[0].bid - lowOfDay) / range) * 100 + 100

    for (let i = 0; i < grafico.length; i++) {
      let preco = ((grafico[i].bid - lowOfDay) / range) * 100 + 100;

      context.beginPath();
      context.moveTo(i, canvas.height - 100 - previousHeight);
      context.lineTo(i + 1, canvas.height - 100 - preco);
      context.strokeStyle = "white";
      context.stroke();

      previousHeight = preco;
    }

    console.log(resultado);
    console.log(resultado[`${moeda1}${moeda2}`].bid);

    const embed = new EmbedBuilder()
      .setTitle(`Cotação`)
      .setDescription(`**${moeda1}** para **${moeda2}**`)
      .setColor( variacao < 0 ?  0xFF0000 :  0x00FF00)
      .setThumbnail(
        variacao > 0 ? `https://media.tenor.com/wjS2sXen8iMAAAAC/stonks-up-stongs.gif` : `https://media.tenor.com/Xm5q3IZIEd4AAAAC/not-stonks-profit-down.gif`
      )
      .setImage("attachment://chart.png")
      .addFields([
        {
          name: `Cotação atual`,
          value: `**${valor}** ${moeda2}`,
          inline: true,
        }
      ]);
      
    await interaction.reply({
      files: [new AttachmentBuilder(canvas.toBuffer(), {name: "chart.png"})],
      embeds: [embed]
    });
  },
};
