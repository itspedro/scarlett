const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Random character test!"),
  
  async execute(interaction) {

    const url = `https://api.jikan.moe/v4/random/characters`;
    const resposta = await fetch(url);
    const resultado = await resposta.json();
    const image = resultado.data.images.jpg.image_url
  
        const embed = new EmbedBuilder()
          .setTitle(resultado.data.name)
          .setColor(0x18e1ee)
          .setImage(image)

   const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true
    });

    message.react('👍');
  },
};
