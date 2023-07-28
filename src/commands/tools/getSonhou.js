const { ContextMenuCommandBuilder, AttachmentBuilder, ApplicationCommandType } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

module.exports = {
    data: new ContextMenuCommandBuilder()
      .setName('Você já sonhou com esse usuário?')
      .setType(ApplicationCommandType.User),

    async execute(interaction) {

        const canvas = Canvas.createCanvas(329, 447);
        const context = canvas.getContext('2d');
   
        const usr = await interaction.targetUser;
        const background = await Canvas.loadImage('https://i.imgur.com/IXiNtbn.jpeg');
        const usrAvatar =  await usr.displayAvatarURL({ extension: 'jpg'});
        const avatar = await Canvas.loadImage(usrAvatar);

        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.drawImage(avatar, 50, 100, 230, 230);

        const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: 'sonhou.jpeg' });
        await interaction.reply({
            files: [attachment]
        });
    }
}