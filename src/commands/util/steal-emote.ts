import { embed, error } from '../../core/utils'
import { Command } from '../../core/customTypes'

const StealCommand: Command = {
	name: 'steal',
	description:
		"Steal an emote from another server. Requires Nitro (won't require soon).",
	usage: 'steal :kekw: kekw',
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		message.guild.emojis
			.create(
				`https://cdn.discordapp.com/emojis/${args[0]
					.split(':')[2]
					.replace('>', '')}${
					args[0].startsWith('<a:') ? '.gif?v=1' : '.png?v=1'
				}`,
				args[1]
			)
			.then((emoji: any) =>
				message.channel.send({
					embeds: [
						embed({
							message: message,
							title: `Added emote ${emoji}!`,
						}),
					],
				})
			)
			.catch((err: Error) =>
				message.channel.send({
					embeds: [
						error({ message: message, description: err.message }),
					],
				})
			)
	},
}

export default StealCommand
