const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const {AuthKey} = require('../../util/config.json')
const {RoleID} = require('../../util/config.json')

//? A simple ping slash command.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('Claim a key To get Role And Access To The Spoofer')
		.addStringOption(option =>
			option.setName('key')
				.setDescription('The key to claim')
				.setRequired(true)),
	async execute(interaction) {
		//gen random password and username
		const username = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(5, 15);
		const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(4, 20);
		const user = interaction.user;
		const key = interaction.options.getString('key');
		const fetch = require('node-fetch');
		const response = await fetch(`https://keyauth.win/api/seller/?sellerkey=${AuthKey}&type=activate&user=${username}&key=${key}&pass=${password}`);
		const text = await response.text();
		if (text.includes('"success":true')) {
			const embed2 = new MessageEmbed()
			.setColor(green)
			.setTitle(`${greenTick} Key Claimed`)
			.setDescription(`**Look in your DMs**`)
			.setFooter(`Claimed by ${user.tag}`, user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			await interaction.channel.send({ embeds: [embed2] });
			console.log(`${user.tag} claimed ${key}`);
			const embed = new MessageEmbed()
				.setColor(green)
				.setTitle(`${greenTick} Key Claimed`)
				.setDescription(`**Key:** ${key}`)
				.addField('Username:', `${username}`, true)
				.addField('Password:', `${password}`, true)
				.setFooter(`Claimed by ${user.tag}`, user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			await user.send({ embeds: [embed] });
			const role = interaction.guild.roles.cache.find(role => role.id === RoleID);
			await interaction.member.roles.add(role);
		} else {
			//if key is invalid
			const embed = new MessageEmbed()
				.setColor('RED')
				.setTitle(`${greenTick} Key Invalid`)
				.setDescription(`**Key:** ${key}`)
				.setFooter(`Claimed by ${user.tag}`, user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			await interaction.reply({ embeds: [embed] });
		}
	},
};