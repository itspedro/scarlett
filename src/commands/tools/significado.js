const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("significado")
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
        
        const upCase = (str) => (
            str.charAt(0).toUpperCase() + str.slice(1)
        );

        const significado = def[0].meanings.toString();
        const fraseSentence = frase[0].sentence.toString();
        const fraseAuthor = frase[0].author.toString();
        const des = def[0].partOfSpeech.toString()
        let etimologia = def[0].etymology.toString();

        const embed = new EmbedBuilder()
            .setTitle(upCase(termo))
            .setColor(0x18e1ee)
            .setDescription(`>>> ${upCase(des)}\n${etimologia = '' ? '' : etimologia}`)
            .addFields(
                { name: '``Significado`` ', value: trim(significado, 1024) },
                { name:'``Frase``', value: `\"${fraseSentence}\" **${fraseAuthor}**` })

        await interaction.reply({
            fetchReply: true,
            embeds: [embed]
        });
    }
}