require("dotenv").config();
const { Client, Collection, GatewayIntentBits, EmbedBuilder, Embed, ActivityType  } = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");
const { token, databaseToken } = process.env;
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

  let servers = client.guilds.cache.size;
  let serverMembers = client.guilds.cache.reduce((a,b) => a + b.memberCount, 0 );

  const actives = [
    {type: ActivityType.Competing, text:`${servers} servidores.`, status:`online`},
    {type: ActivityType.Watching, text:` os ${serverMembers} membros.`, status:`dnd`},
    {type: ActivityType.Listening, text:`caneta azul.`, status:`idle`}
  ];

  setInterval(() => {
      const index = Math.floor(Math.random() * actives.length)
      const text = actives[index].text;
      const type = actives[index].type;
      const status = actives[index].status;

      client.user.setPresence({ activities: [{name: `${text}`, type: type}], status: status});

  }, 10000)


}),

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