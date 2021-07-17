import request from "request";
import newEmbed from "../embed";

export default async (client: any, message: any, args: any) => {
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
		let data: any = JSON.parse(body);
		console.log(data);

		if (err || !data) {
			return message.channel.send(`:x: Something went wrong.`);
		} else {
			let title = `Mando's URL shortener`;
			let fields = [
				{ name: "Your shortened link", value: data.result_url, inline: false },
				{ name: "Original link", value: args[1], inline: false },
			];
			return message.channel.send(newEmbed(message, title, fields));
		}
	});
};
