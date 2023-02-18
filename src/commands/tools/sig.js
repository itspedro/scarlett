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

        const urlSen = await fetch(`https://dicio-api-ten.vercel.app/v2/frases/${termo}`);
        const frase = await urlSen.json();
        

        const urlDef = await fetch(`https://dicio-api-ten.vercel.app/v2/${termo}`);
        const def = await urlDef.json();

        const trim = (str, max) => (
            str.length > max ? `${str.slice(0, max - 3)}...` : str
        );

        const embed = new EmbedBuilder()
            .setTitle(termo)
            .setColor(0x18e1ee)
            .setDescription(def[0].partOfSpeech.toString())
            .addFields(
                { name: 'Significado ', value: trim(def[0].meanings.toString(), 1024) },
                { name:'Frase', value: `"${frase[0].sentence.toString()}" **${frase[0].author.toString()}**` })

        await interaction.reply({
            embeds: [embed]
        });
    }
}