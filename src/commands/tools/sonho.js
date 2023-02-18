const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("sonhou")
        .setDescription("Responde com uma imagem")
        .addUserOption((option) => 
            option
                .setName("nome")
                .setRequired(true)
                .setDescription("nome desejado")
    ),
    async execute(interaction) {

        
        const canvas = Canvas.createCanvas(329, 447);
        const context = canvas.getContext('2d');
   
        const nome = interaction.options.getUser("nome");
        const background = await Canvas.loadImage('https://i.imgur.com/IXiNtbn.jpeg');
        const body =  await nome.displayAvatarURL({ extension: 'jpg'});
        const avatar = await Canvas.loadImage(body);

        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context. drawImage(avatar, 50, 100, 230, 230);

        const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: 'sonhou.jpeg' });
        await interaction.reply({
            files: [attachment]
        });
    }
}