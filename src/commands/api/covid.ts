import request from 'request'
import { embed, error } from '../../core/utils'
import { Command } from '../../core/customTypes'

const CovidCommand: Command = {
	name: 'covid',
	description: 'Retrieve info about the COVID-19 pandemic.',
	usage: 'covid canada',
	alias: ['covid-19'],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const options = {
			method: 'GET',
			url: 'https://covid-193.p.rapidapi.com/statistics',
			headers: {
				'x-rapidapi-key': process.env.RAPIDAPI_KEY,
				'x-rapidapi-host': 'covid-193.p.rapidapi.com',
				useQueryString: true,
			},
		}

		options.url = `https://covid-193.p.rapidapi.com/statistics?country=${args[0]}`
		return request(options, (err: any, res: any, body: any) => {
			if (err) throw err

			let data: any = JSON.parse(body).response[0]
			let thumbnailUrl =
				'https://i.ibb.co/93nq5jr/undraw-Analytics-re-dkf8.png'

			if (!data) {
				return message.channel.send({
					embeds: [
						error({
							message: message,
							description: 'Invalid country provided',
						}),
					],
				})
			} else {
				let title = `COVID 19 info for ${args[0]}`
				let fields = [
					{ name: 'Country', value: data.country, inline: false },
					{
						name: 'Total Cases',
						value: data.cases.total,
						inline: true,
					},
					{
						name: 'Active Cases',
						value: data.cases.active,
						inline: true,
					},
					{ name: 'New Today', value: data.cases.new, inline: true },
					{
						name: 'Recovered',
						value: data.cases.recovered,
						inline: false,
					},
					{ name: 'Deaths', value: data.deaths.total, inline: false },
					{
						name: 'Tests executed',
						value: data.tests.total,
						inline: false,
					},
				]
				let footer = `Last updated ${data.day}`
				let url = `https://covid-193.p.rapidapi.com/statistics?country=${args[0]}`
				return message.channel.send({
					embeds: [
						embed({
							message: message,
							title: title,
							fields: fields,
							footer: footer,
							url: url,
							thumbnailUrl: thumbnailUrl,
						}),
					],
				})
			}
		})
	},
}

export default CovidCommand
