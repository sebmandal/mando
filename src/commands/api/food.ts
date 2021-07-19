import request from "request";
import newEmbed from "../../core/customEmbed";
import { Command } from "../../core/customTypes";

const CovidCommand: Command = {
	name: "food",
	description: "Retrieve info about foods, beverages, etc.",
	usage: "food cheddar cheese",
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const options = {
			method: "GET",
			url: "https://nutritionix-api.p.rapidapi.com/v1_1/search/",
			qs: { fields: "item_name,item_id,brand_name,nf_calories,nf_total_fat" },
			headers: {
				"x-rapidapi-key": process.env.RAPIDAPI_KEY,
				"x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
				useQueryString: true,
			},
		};

		options.url = options.url + args.join(" ");

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

		return request(options, (err: any, res: any, body: any) => {
			let result = JSON.parse(body).hits[0].fields;

			let title = result.item_name;
			let fields = [
				{
					name: "Brand name",
					value: result.brand_name,
				},
				{
					name: "Calories",
					value: result.nf_calories,
				},
				{
					name: "Total Fat",
					value: result.nf_total_fat,
				},
			];

			return message.channel.send(newEmbed(message, title, fields));
		});
	},
};

export default CovidCommand;
