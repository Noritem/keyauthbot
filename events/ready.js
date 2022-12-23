module.exports = {
	name: 'ready',
	once: 'true',
	async execute(client) {
		client.user.setPresence({
			activities: [{ name: 'System Is Loading', type: 'PLAYING' }],
			status: 'online',//after 2 seconds it will change to online
		})
		setTimeout(() => {
			client.user.setPresence({
				activities: [{ name: `Bot By Noritem#1337`, type: 'PLAYING' }],//this will show all users in database
				status: 'online',
			})
		}, 5000)
		console.log(`\x1b[38;2;87;117;144m[Client] \x1b[32m${client.user.username} \u001b[37mis online!`)
	},
}
