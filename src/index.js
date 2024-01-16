require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { TOKEN, DATABASE_TOKEN } = process.env;
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
client.login(TOKEN);

(async () => {
  await connect(DATABASE_TOKEN).catch(console.error);
})();

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