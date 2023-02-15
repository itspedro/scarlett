const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());

        console.log(`o comando: ${command.data.name} foi registrado!`);
      }
    }

    const clientId = "776304828589670411";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("started refreshing application (/) commands.");

      await rest.put(Routes.applicationGuildCommands(clientId), {
        body: client.commandArray,
      });

      console.log("Succesfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
