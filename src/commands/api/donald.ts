import request from "request";
import { embed, error } from "../../core/utils";
import { Command } from "../../core/customTypes";

const DonaldCommand: Command = {
	name: "donald",
	description: "Retrieve info about the COVID-19 pandemic.",
	usage: "donald",
	alias: ["don", "trump"],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
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

		return request(options, function (error, response, body) {
			if (error) throw new Error(error);

			let data = JSON.parse(body);

			let title = "Your randomly generated Trump quote";

			let fields = [
				{
					name: "Donald Trump, " + data.appeared_at.substring(0, 4),
					value: data.value,
				},
			];

			return message.channel.send(
				embed({ message: message, title: title, fields: fields })
			);
		});
	},
};

export default DonaldCommand;
