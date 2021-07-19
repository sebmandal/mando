import request from "request";
import { embed, error } from "../../core/embed";
import { Command } from "../../core/customTypes";

const FoodCommand: Command = {
	name: "food",
	description: "Retrieve info about foods, beverages, etc.",
	usage: "food cheddar cheese",
	alias: [],
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
			let description = ":x: Provide a search term.";

			return await message.channel.send(error({ message, title, description }));
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

			return message.channel.send(
				embed({ message: message, title: title, fields: fields })
			);
		});
	},
};

export default FoodCommand;
