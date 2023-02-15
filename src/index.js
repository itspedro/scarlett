require("dotenv").config();

const { Client, Collection, GatewayIntentBits, EmbedBuilder, Embed  } = require("discord.js");

const cron = require("cron");
const fetch = require("node-fetch");
const fs = require("fs");
const { token, API_KEY, databaseToken } = process.env;
const { connect } = require('mongoose');
//const bot = new Client({ intents: ['Guilds'] });


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
/*bot
  .login(process.env.BOT_TOKEN)
  .then(() => console.log("Conectado!"))
  .catch((error) => console.log("Deu ERRO - " + error));
const commandsFiles = fs.readSync('./comandos').filter(file => file.endsWith('.js'));


const commands = [];

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	commands.push(command.data.toJSON());
};

const rest = new REST({ version: '9' }).setToken(token);
*/

client.on("ready", async () => {
  // await bot.application.commands.set([
  //   {
  //     name: "ping",
  //     description: "Responde Pong!",
  //   },
  // ]);
  // console.log("Pong!");
  // const guild_ids = client.guilds.cache.map(guild => guild.id);

  // const rest = new REST({ version: '9' }).setToken(token);

  // bot.on("datainteractionCreate", (interaction) => {
  //   if (!interaction.isCommand()) return;

  //   if (interaction.commandName === "ping") interaction.reply("Pong!");
  // });

  let bomDiaCaralho = new cron.CronJob("00 00 10 * * *", async () => {
    
    const guild = client.guilds.cache.get("874833976085344307");
    const channel = guild.channels.cache.get("875014073543188490");
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=bomdia&limit=25&offset=0&rating=g&lang=pt`;
    const resposta = await fetch(url);
    const resultado = await resposta.json();
    const index = Math.floor(Math.random() * resultado.data.length);
     //console.log(resultado);
     const embed = new EmbedBuilder()
     .setTitle(`Bom Dia!`)
     .setColor(0x18e1ee)
     .setDescription('   :point_up: Clique aqui se o gif não aparecer.')
     .setURL(`https://media0.giphy.com/media/${resultado.data[index].id}/giphy.gif?cid=ecf05e47up013zrc4u0mrk8ayyyetcedcfcbzh3c8ux96vc6&rid=giphy.gif&ct=g`)
     .setImage(`https://media0.giphy.com/media/${resultado.data[index].id}/giphy.gif?cid=ecf05e47up013zrc4u0mrk8ayyyetcedcfcbzh3c8ux96vc6&rid=giphy.gif&ct=g`)
     .setTimestamp();
    channel.send({embeds: [embed]});
    //channel.send("Bom dia.");
    //channel.send(resultado.results[index].url);
  });
  
  bomDiaCaralho.start();

  console.log("Bom dia caralho!");

});

client.on('messageCreate', (message) => {
  console.log(message.content);
  console.log(message.author.tag);
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


