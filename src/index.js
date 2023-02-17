require("dotenv").config();
const { Client, Collection, GatewayIntentBits, EmbedBuilder, Embed, ActivityType  } = require("discord.js");
const cron = require("cron");
const fetch = require("node-fetch");
const fs = require("fs");
const { token, API_KEY, databaseToken } = process.env;
const { connect } = require('mongoose');


const client = new Client({ intents: 32767 });

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.login(token);

(async () => {
  await connect(databaseToken).catch(console.error);
})();

console.log("Conectando...");

client.on("ready", async () => {

  client.user.setStatus('idle');

  let bomDia = new cron.CronJob("00 00 10 * * *", async () => {
    
    const guild = client.guilds.cache.get("874833976085344307");
    const channel = guild.channels.cache.get("1075315140108492821");
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=bomdia&limit=25&offset=0&rating=g&lang=pt`;
    const resposta = await fetch(url);
    const resultado = await resposta.json();
    const index = Math.floor(Math.random() * resultado.data.length);
    const gif = `https://media4.giphy.com/media/${resultado.data[index].id}/giphy.gif?&rid=giphy.gif`

    const embed = new EmbedBuilder()
     .setTitle(`Bom Dia!`)
     .setColor(0x18e1ee)
     .setDescription(':point_up: Clique aqui se o gif não aparecer.')
     .setURL(gif)
     .setImage(gif)
     .setTimestamp();

    channel.send({embeds: [embed]});
  });
  
  bomDia.start();
  console.log("Bom dia");
});

async () => {
  try {
    console.log(`Started refreshing application (/) commands.`);

    const fs = await rest.put(Routes.applicationCommands(Client), {
      body: commands,
    });
    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
};


