import request from "request";
import newEmbed from "../embed";
import dotenv from "dotenv";
dotenv.config();

const info = `The short command shortens a URL for you.`;

const usage = `${process.env.prefix}short https://example.com/`;

const run = async (client: any, message: any, args: string[]) => {
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

	options.form.url = args[1];

	request(options, (err, res, body) => {
		if (err) throw err;

		let data: any = JSON.parse(body);
		let thumbnailUrl = "https://i.ibb.co/Dpwjvy9/short.png";

		if (!data.result_url) {
			let title = "That's not a valid URL.";
			let fields = [
				{
					name: ":x: Invalid URL provided :x:",
					value: "Invalid URL provided.",
					inline: false,
				},
			];
			return message.channel.send(
				newEmbed(
					message,
					title,
					fields,
					undefined,
					undefined,
					undefined,
					thumbnailUrl
				)
			);
		} else {
			let title = `Mando's URL shortener`;
			let fields = [
				{ name: "Your shortened link", value: data.result_url, inline: false },
				{ name: "Original link", value: args[1], inline: false },
			];
			return message.channel.send(
				newEmbed(
					message,
					title,
					fields,
					undefined,
					data.result_url,
					undefined,
					thumbnailUrl
				)
			);
		}
	});
};

export { run, info, usage };
