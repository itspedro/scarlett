const Guild = require('../../schemas/guild');
const bomDiaCron = require('../../utils/bomdia-cron');

module.exports = async (client) => {
  const allGuilds = await Guild.find({});

  allGuilds.forEach(async (guild) => {
    if (guild.bomDiaConfig && guild.bomDiaConfig.length > 0) {
      const horas = guild.bomDiaConfig[0].horas;
      const minutos = guild.bomDiaConfig[0].minutos;
      const channelId = guild.bomDiaConfig[0].channel;
      const channel = await client.channels.fetch(channelId);

      console.log(horas + ':' + minutos);
      console.log(`Found bomDiaConfig for guild with ID ${guild.id}`);

      bomDiaCron(horas, minutos, channel);

    } else {
      console.log(`No bomDiaConfig found for guild with ID ${guild.id}`);
    }
  });
}