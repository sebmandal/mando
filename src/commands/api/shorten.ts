import request from "request";
import { embed, error } from "../../core/embed";
import { Command } from "../../core/customTypes";

const ShortenCommand: Command = {
	name: "shorten",
	description: "Shorten a URL Link.",
	usage: "shorten https://google.com/",
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const options = {
			method: "POST",
			url: "https://url-shortener-service.p.rapidapi.com/shorten",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"x-rapidapi-key": process.env.RAPIDAPI_KEY,
				"x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
				useQueryString: true,
			},
			form: { url: "" },
		};

		options.form.url = args[0];

		return request(options, (err, res, body) => {
			if (err) throw err;

			let data: any = JSON.parse(body);
			let thumbnailUrl = "https://i.ibb.co/Dpwjvy9/short.png";

			if (!data.result_url) {
				let title = "That's not a valid URL.";
				let description = ":x: Invalid URL provided";

				return message.channel.send(error(message, title, description));
			} else {
				let title = `Mando's URL shortener`;
				let fields = [
					{
						name: "Your shortened link",
						value: data.result_url,
						inline: false,
					},
					{ name: "Original link", value: args[0], inline: false },
				];
				return message.channel.send(
					embed(
						message,
						title,
						undefined,
						fields,
						undefined,
						data.result_url,
						undefined,
						thumbnailUrl
					)
				);
			}
		});
	},
};

export default ShortenCommand;
