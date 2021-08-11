const { MessageEmbed } = require("discord.js");

const cmds = {
	embed: async (client, interaction, args) => {
		return {
			embeds: [
				new MessageEmbed({
					color: 0xff0000,
					title: "Pong!",
					description: "Pingity Pongity!",
				}),
			],
		};
	},
	echo: async (client, interaction, args) => {
		return args._hoistedOptions[0].value;
	},
};

module.exports = {
	name: "test",
	description: "Test commands",
	type: 2,
	options: [
		{
			name: "embed",
			type: 1,
			description: "Let's play some ping pong!",
		},
		{
			name: "echo",
			type: 1,
			description: "The bot replies with you query!",
			options: [
				{ name: "input", type: 3, description: "Your input", required: true },
			],
		},
	],

	run: async (client, interaction, args) => {
		await interaction.deferReply({ ephemeral: false }); // Mando is thinking...

		const subCommand = args.getSubcommand();

		return await interaction.followUp(
			await cmds[subCommand](client, interaction, args)
		);
	},
};
