const { ContextMenuCommandBuilder, ApplicationCommandType, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { join } = require('path');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Criar citação')
    .setType(ApplicationCommandType.Message),

  async execute(interaction) {
 
    const canvas = Canvas.createCanvas(1404, 803);
    const context = canvas.getContext('2d');
    const linkRegex = /https?:\/\/\S+/g;
    const msg = !linkRegex.test(interaction.targetMessage) && interaction.targetMessage;
    if (!msg) return interaction.reply({
      content: 'Não encontrei nenhuma mensagem válida.',
      ephemeral: true
    });
    const msgContent = msg.content;
    const msgAuthor = msg.author;
    const currentDate = new Date();
    const background = await Canvas.loadImage('https://i.imgur.com/uSCKU2r.png');
    const body = await msgAuthor.displayAvatarURL({ extension: 'jpg' });
    const avatar = await Canvas.loadImage(body);

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.save();
    context.roundRect(87, 87, 640, 640, 40);
    context.clip();
    context.drawImage(avatar, 87, 87, 640, 640);
    context.restore();

    const gradient = context.createLinearGradient(0, 0, 640, 0);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context.fillStyle = gradient;
    context.fillRect(87, 87, 640, 640);

    async function wrapText(context, text, maxWidth) {

      return new Promise((resolve, reject) => {

        if (typeof text !== 'string' || typeof maxWidth !== 'number') {
          reject('Invalid arguments');
        };

        let words = text.split(' ');
        let lines = [];
        let currentLine = words[0];

        if (words.length <= 1 ) {
          let word = currentLine;
          width = context.measureText(word).width;
          if (width > maxWidth) {
            let regex = new RegExp(`.{1,${Math.floor(word.length / 2)}}`, 'g');
            word = word.match(regex);
            lines.push(word[0]);
            lines.push(word[1]);
            resolve(lines);
            return;
          };
        };

        for (let i = 1; i < words.length; i++) {
          let word = words[i];
          let width = context.measureText(`${currentLine} ${word}`).width;
          if (width < maxWidth) {
            currentLine += ` ${word}`;
          } else {
            lines.push(currentLine);
            currentLine = word;
          };      
        };
        lines.push(currentLine);
        resolve(lines);
      });

    };

    const lines = await wrapText(context, msgContent, 100);
    context.font = `bold 40px Ubuntu`;
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';

    const lineheight = 40;
    const lineSpacing = 5;
    const firstLinePosition = lines.length === 1 ? 400 : 350;

    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], 900, firstLinePosition + lineheight * i + lineSpacing * i);
    };

    context.font = `italic 25px Arial`;
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.fillText(`- ${msgAuthor.username}, ${currentDate.getFullYear()}`, 900, firstLinePosition + lineheight * lines.length + lineSpacing * lines.length + 50);

    interaction.deferReply();

    const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: 'frase.jpeg' });
    await interaction.channel.createWebhook({
      name: 'o pensador',
      avatar: 'https://st.depositphotos.com/1533202/1380/i/600/depositphotos_13804174-stock-photo-rodin-thinker-statue.jpg'
    }).then(webhook => {
      webhook.send({
        files: [attachment]
      }).then(() => {
        webhook.delete();
      });
    });
    interaction.deleteReply();
  }
};