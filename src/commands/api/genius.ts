import request from "request";
import newEmbed from "../../core/customEmbed";
import { Command } from "../../core/customTypes";

const CovidCommand: Command = {
	name: "genius",
	description: "Retrieve info about artists and song on Genius.",
	usage: "genius Ski Mask the Slump God",
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
			let title = "Provide a search term.";
			let fields = [
				{
					name: ":x: Provide a search term.",
					value: "Please provide a search term.",
				},
			];

			return await message.channel.send(newEmbed(message, title, fields));
		}

		options.qs.q = args.join(" ");

		return request(options, (err: any, res: any, body: any) => {
			if (err) throw err;

			let title = `Top 5 hits for **${options.qs.q}**`;

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

			return message.channel.send(newEmbed(message, title, fields));
		});
	},
};

export default CovidCommand;
