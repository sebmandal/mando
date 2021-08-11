const { MessageEmbed } = require("discord.js");
const { parse } = require("dotenv");
const request = require("request");

const cmds = {
	random: async (client, interaction, args) => {
		const options = {
			method: "GET",
			url: "https://matchilling-tronald-dump-v1.p.rapidapi.com/random/quote",
			headers: {
				accept: "application/hal+json",
				"x-rapidapi-key": process.env.RAPIDAPI_KEY,
				"x-rapidapi-host": "matchilling-tronald-dump-v1.p.rapidapi.com",
				useQueryString: true,
			},
		};

		return request(options, async function (error, response, body) {
			if (error) throw new Error(error);

			return interaction.followUp({
				embeds: [
					new MessageEmbed({
						title: "Your randomly generated Donald Trump quote",
						color: 0xff0000,
						fields: [
							{
								name:
									"Donald Trump, " +
									JSON.parse(body).appeared_at.substring(0, 4),
								value: JSON.parse(body).value,
								inline: false,
							},
						],
					}),
				],
			});
		});
	},

	// todo: add this command/make it functional
	//! dependent on the API working, which it isn't at the moment
	search: async (client, interaction, args) => {},
};

module.exports = {
	name: "trump",
	description: "Fetch a random Donald Trump quote.",
	type: 1,

	run: async (client, interaction, args) => {
		await interaction.deferReply({ ephemeral: false });
		return await cmds["random"](client, interaction, args);
	},
};
