const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { green, greenTick } = require(`../../../util/config.json`)
const {AuthKey} = require('../../../util/config.json')
const {Role} = require('../../../util/config.json')

//? A simple ping slash command.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Resets a users HWID')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The username of the user')
				.setRequired(true)),
	async execute(interaction) {
		//if user has role to run command
		if (interaction.member.roles.cache.has(Role)) {
			const user = interaction.user;
			const type = interaction.options.getString('username');
			const fetch = require('node-fetch');
			const response = await fetch(`https://keyauth.win/api/seller/?sellerkey=${AuthKey}&type=resetuser&user=${type}&format=text`);
			const text = await response.text();
			const embed = new MessageEmbed()
				.setColor(green)
				.setTitle(`${greenTick} HWID Reset`)
				.setDescription(`**HWID Reset:** Success`)
				.setFooter(`HWID Reset by ${user.tag}`, user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			await interaction.reply({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed()
				.setColor('RED')
				.setTitle('❌ Error')
				.setDescription('You do not have permission to run this command!')
				.setTimestamp();
			await interaction.reply({ embeds: [embed] });
		}
	}
}
