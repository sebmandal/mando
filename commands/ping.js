const { MessageEmbed } = require("discord.js");

const lmao = () => {
	let embed = new MessageEmbed()
		.setColor(0xff0000)
		.setTitle("Pong!")
		.setDescription("Pong!");
	return embed;
};

module.exports = {
	info: {
		data: {
			name: "ping",
			description: "sends pong!",
		},
	},
	callback: {
		data: {
			type: 4,
			data: {
				// content: "Pong!",
				embeds: [lmao()],
			},
		},
	},
};
