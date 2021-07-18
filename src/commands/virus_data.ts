import request from "request";
import newEmbed from "../embed";
import dotenv from "dotenv";
dotenv.config();

export const run = async (client: any, message: any, args: string[]) => {
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
		let data: any = JSON.parse(body).response[0];

		if (err) return message.channel.send(`:x: Something went wrong.`);
		if (!data) return message.channel.send(`:x: Invalid country.`);
		if (data) {
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
			let url = `https://covid-193.p.rapidapi.com/statistics?country=${args[1]}`;
			let footer = `Last updated ${data.day}`;
			return message.channel.send(
				newEmbed(message, title, fields, footer, url)
			);
		}
	});
};

export const usage = `${process.env.prefix}covid canada`;
export const info = `The covid command displays information about the COVID-19 pandemic.`;
