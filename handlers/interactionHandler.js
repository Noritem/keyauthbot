require('dotenv').config()
const { getFiles } = require('../util/functions')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, guildID } = require('../util/config.json');

module.exports = (client) => {
	const commandArray = []
	//! Slash Command Files.
	const slashCommandFiles = getFiles('./commands/')
	for (const slashCommand of slashCommandFiles) {
		const slashCommandFile = require(slashCommand)
		client.slashCommands.set(slashCommandFile.data.name, slashCommandFile)
		commandArray.push(slashCommandFile.data.toJSON())
		console.log(`\x1b[38;2;243;114;44m[Slash] \x1b[32m${slashCommandFile.data.name}\x1b[0m has been loaded.`)
	}

	const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
	(async () => {
		try {
			await rest.put(
			 	Routes.applicationCommands(clientID),
			 	{ body: commandArray },
			 );
		} catch (error) {
			console.error(error);
		}
	})();
}
