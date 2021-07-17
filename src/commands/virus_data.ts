import request from "request";
import newEmbed from "../embed";

export default async (client: any, message: any, args: any) => {
	const options = {
		method: "GET",
		url: "https://covid-193.p.rapidapi.com/statistics",
		headers: {
			"x-rapidapi-key": process.env.COVID19_API_KEY,
			"x-rapidapi-host": process.env.COVID19_API_HOST,
			useQueryString: true,
		},
	};

	options.url = `https://covid-193.p.rapidapi.com/statistics?country=${args[1]}`;
	request(options, (err, res, body) => {
		let data: any = JSON.parse(body).response[0];

		if (err || !data) {
			return message.channel.send(`:x: Something went wrong.`);
		} else {
			let title = `COVID 19 info for ${args[1]}`;
			let fields = [
				{ name: "Country", value: data.country, inline: false },
				{ name: "Total Cases", value: data.cases.total, inline: true },
				{ name: "New Cases", value: data.cases.new, inline: true },
				{ name: "Active Cases", value: data.cases.active, inline: true },
				{ name: "Recovered", value: data.cases.recovered, inline: false },
				{ name: "Deaths", value: data.deaths.total, inline: false },
				{ name: "Tests executed", value: data.tests.total, inline: false },
			];
			let footer = `https://covid-193.p.rapidapi.com/statistics?country=${args[1]}`;
			return message.channel.send(newEmbed(message, title, fields));
		}
	});
};
