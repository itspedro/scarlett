const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sig")
        .setDescription("Responde a definição do termo pedido")
        .addStringOption((option) => 
            option
                .setName("termo")
                .setRequired(true)
                .setDescription("termo desejado")
    ),
    async execute(interaction) {
        
        const termo = interaction.options.getString("termo");
        const termGet = termo.charAt(0).toUpperCase() + termo.slice(1);

        const urlSen = await fetch(`https://dicio-api-ten.vercel.app/v2/frases/${termo}`);
        const frase = await urlSen.json();
        

        const urlDef = await fetch(`https://dicio-api-ten.vercel.app/v2/${termo}`);
        const def = await urlDef.json();

        const embed = new EmbedBuilder()
            .setTitle(termGet)
            .setColor(0x18e1ee)
            .setDescription(def[0].partOfSpeech)
            .addFields(
                { name: 'Significado ', value: def[0].meanings.toString() },
                { name:'Frase', value: `"${frase[0].sentence}" **${frase[0].author}**` })

        await interaction.reply({
            embeds: [embed]
        });
    }
}