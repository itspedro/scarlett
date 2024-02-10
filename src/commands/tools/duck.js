const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { UNSPLASH_ACCESS_KEY } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("duck")
    .setDescription("fotos de pato"),
  
  async execute(interaction) {

    const url = `https://api.unsplash.com/photos/random?query=duck&w=1080&h=1920`;

    const resposta = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      })
    const resultado = await resposta.json();
    const image = resultado.urls.regular;

        const embed = new EmbedBuilder()
          .setTitle(`Pato`)
          .setColor(0x18e1ee)
          .setImage(image)

   const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true
    });

    message.react('👍');
  },
};
