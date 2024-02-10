const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Random character test!"),

  async execute(interaction) {
    const url = `https://api.jikan.moe/v4/random/characters`;
    const resposta = await fetch(url);
    const resultado = await resposta.json();
    const image = resultado.data.images.jpg.image_url;
    const id = resultado.data.mal_id;
    const fullUrl = `https://api.jikan.moe/v4/characters/${id}/full`;
    const fullResult = await fetch(fullUrl);
    const fullResp = await fullResult.json();
    const anime = fullResp.data.anime[0].anime.title;
    const fav = fullResp.data.favorites;

    const embed = new EmbedBuilder()
      .setTitle(resultado.data.name)
      .setColor(0x18e1ee)
      .setImage(image)
      .setDescription(
        `${anime}\nClaims: 0000\nLikes: ${fav} favs\n **000** :zap: `
      );

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    message.react("👍");
  },
};
