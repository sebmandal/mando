import request from "request";
import { embed, error } from "../../core/utils";
import { Command } from "../../core/customTypes";

const GeniusCommand: Command = {
	name: "genius",
	description: "Retrieve info about artists and song on Genius.",
	usage: "genius Ski Mask the Slump God",
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const options = {
			method: "GET",
			url: "https://genius.p.rapidapi.com/search",
			qs: { q: "" },
			headers: {
				"x-rapidapi-key": process.env.RAPIDAPI_KEY,
				"x-rapidapi-host": "genius.p.rapidapi.com",
				useQueryString: true,
			},
		};

		if (args.length <= 0) {
			return await message.channel.send(
				error({ message: message, description: "Provide a search term." })
			);
		}

		options.qs.q = args.join(" ");

		return request(options, (err: any, res: any, body: any) => {
			if (err) throw err;
			const data = JSON.parse(body);
			const results = data.response.hits
				.slice(5, data.response.hits.length)
				.map((hit: any) => {
					return {
						title: hit.result.full_title,
						url: hit.result.url,
						description: hit.result.primary_artist.name,
					};
				});

			let fields: any = [];

			results.forEach((result: any) => {
				fields.push({
					name: result.title,
					value: `[${result.description}](${result.url})`,
					inline: false,
				});
			});

			let title = `Top ${fields.length} hits for **${options.qs.q}**`;

			return message.channel.send(
				embed({ message: message, title: title, fields: fields })
			);
		});
	},
};

export default GeniusCommand;
