import { embed, error } from '../../core/utils'
import { Command } from '../../core/customTypes'

const ThreadCommand: Command = {
	name: 'thread',
	description: 'Start a thread.',
	usage: 'thread <thread title>',
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const thread = await message.channel.threads.create({
			name: args.join(' '),
			autoArchiveDuration: 4320,
			reason: 'Custom thread provided by Mando.',
		})
	},
}

export default ThreadCommand
