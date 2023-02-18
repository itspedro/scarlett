const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Selecione uma linguagem...')
                .addOptions({
                    label: 'javaScript',
                    description: 'Documentação do javaScript',
                    value: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
                })
        )

module.exports = {

    data: new  SlashCommandBuilder()
        .setName('docs')
        .setDescription('Veja a documentação das linguagens'),
    async execute(interaction, client) {
        await interaction.editReply({
            content: "Selecione uma linguagem", components: [row], ephemeral: true
        });
    }
}