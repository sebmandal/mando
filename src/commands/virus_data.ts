import request from "request";
import newEmbed from "../embed";
import dotenv from "dotenv";
dotenv.config();

const usage = `${process.env.prefix}covid canada`;

const info = `The covid command displays information about the COVID-19 pandemic.`;

const run = async (client: any, message: any, args: string[]) => {
	const options = {
		method: "GET",
		url: "https://covid-193.p.rapidapi.com/statistics",
		headers: {
			"x-rapidapi-key": process.env.RAPIDAPI_KEY,
			"x-rapidapi-host": "covid-193.p.rapidapi.com",
			useQueryString: true,
		},
	};

	options.url = `https://covid-193.p.rapidapi.com/statistics?country=${args[1]}`;
	request(options, (err, res, body) => {
		if (err) throw err;

		let data: any = JSON.parse(body).response[0];
		let thumbnailUrl = "https://i.ibb.co/93nq5jr/undraw-Analytics-re-dkf8.png";

		if (!data) {
			let title = "That's not a valid country.";
			let fields = [
				{
					name: ":x: Invalid country provided :x:",
					value: "Invalid country provided.",
					inline: false,
				},
			];
			message.channel.send(
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
			let title = `COVID 19 info for ${args[1]}`;
			let fields = [
				{ name: "Country", value: data.country, inline: false },
				{ name: "Total Cases", value: data.cases.total, inline: true },
				{ name: "Active Cases", value: data.cases.active, inline: true },
				{ name: "New Today", value: data.cases.new, inline: true },
				{ name: "Recovered", value: data.cases.recovered, inline: false },
				{ name: "Deaths", value: data.deaths.total, inline: false },
				{ name: "Tests executed", value: data.tests.total, inline: false },
			];
			let footer = `Last updated ${data.day}`;
			let url = `https://covid-193.p.rapidapi.com/statistics?country=${args[1]}`;
			return message.channel.send(
				newEmbed(message, title, fields, footer, url, undefined, thumbnailUrl)
			);
		}
	});
};

export { run, info, usage };
