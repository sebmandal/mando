const { MessageEmbed } = require("discord.js");
const { parse } = require("dotenv");
const database = require("mime-db");
const request = require("request");

const fixGrammar = async (client, interaction, args) => {
	const options = {
		method: "POST",
		url: "https://grammarbot.p.rapidapi.com/check",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"x-rapidapi-key": process.env.RAPIDAPI_KEY,
			"x-rapidapi-host": "grammarbot.p.rapidapi.com",
			useQueryString: true,
		},
		form: {
			text: interaction.options._hoistedOptions[0].value,
			language: "en-US",
		},
	};

	return request(options, async function (error, response, body) {
		if (error) throw new Error(error);

		const data = JSON.parse(body);
		const input = interaction.options._hoistedOptions[0].value;

		return await interaction.followUp({
			embeds: [
				new MessageEmbed({
					title: "Report on your grammar",
					description: `Input: ${input}`,
					color: 0xff0000,
					fields: [
						data.matches.length > 0
							? data.matches.map((match) => {
									const offset = match.context.offset;
									const length = match.context.length;
									return {
										// name: "Suggestion " + (data.matches.indexOf(match) + 1),
										name: `${input.substring(
											offset,
											length + offset
										)} (appears at ${offset + ":" + (offset + length)})`,
										value: match.message,
										inline: true,
									};
							  })
							: {
									name: "Congratulations!",
									value:
										"Mando could not detect any wrongful grammar in your input!",
									inline: false,
							  },
					],
				}),
			],
		});
	});
};

module.exports = {
	name: "grammar",
	description: "Fix som grammer.",
	type: 1,
	options: [
		{
			name: "input",
			type: 3,
			description: "Your input",
			required: true,
		},
	],

	run: async (client, interaction, args) => {
		await interaction.deferReply({ ephemeral: false });
		return await fixGrammar(client, interaction, args);
	},
};
