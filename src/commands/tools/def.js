const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { axios } = require('axios');

module.exports = {
    data: new  SlashCommandBuilder()
        .setName("def")
        .setDescription("Responde a definição do termo pedido")
        .setRequired(true)
        .addStringOption((option) => 
            option
            .setName("termo")),
    async execute(interaction, client) {

        const termo = interaction.options.getString("termo");
        const frase = await axios.get(`https://dicio-api-ten.vercel.app/v2/frases/${termo}`)
            .then((res) => {res.data});

        const def = await axios.get(`https://dicio-api-ten.vercel.app/v2/${termo}`)
            .then((res) => {res.data[0]});

        const embed = new EmbedBuilder()
            .setTitle(termo)
            .setColor(0x18e1ee)
            .setDescription(def.partOfSpeech)
            .addFields(
                { name: 'Significado ', value: def.meanings },
                { name:'Frase', value: `${frase[0].sentence} -${frase[0].author}` })

        await interaction.editReply({
            embeds: [embed]
        });
    }
}