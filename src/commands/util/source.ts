import { embed } from '../../core/utils'
import { Command } from '../../core/customTypes'
import commands from '../../core/commandRegistry'

const SourceCommand: Command = {
	name: 'source',
	description: 'Sends back the source code link',
	usage: 'source',
	alias: ['s'],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		return await message.channel.send({
			embeds: [
				embed({
					message: message,
					title: 'Source',
					description: '[Link](https://github.com/sebmandal/mando)',
					url: 'https://github.com/sebmandal/mando',
				}),
			],
		})
	},
}

export default SourceCommand
