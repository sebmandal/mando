import { embed, error } from '../../core/utils'
import { Command } from '../../core/customTypes'

const KickCommand: Command = {
	name: 'kick',
	description: 'Kick people from the guild.',
	usage: `kick @user#1337 (or user's id)`,
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		// checking if a user is specified,
		// the author is able to kick them themselves,
		// and checking if the bot is able to kick the specified user.
		if (!message.member.hasPermission('KICK_MEMBERS'))
			return message.reply('You cannot kick members')

		let member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0])

		if (!member)
			return message.reply('Please specify a member for me to kick them')

		let reason = args.join(' ')
		if (!reason) reason = 'No reason given.'

		if (!member.kickable)
			return message.channel.send({
				embeds: [
					error({
						message: message,
						description: 'This member is not kickable.',
					}),
				],
			})

		member
			.kick(reason)
			.then(() => {
				message.channel.send({
					embeds: [
						embed({
							message: message,
							title: `${member.tag} was kicked.`,
						}),
					],
				})
			})
			.catch((err: any) => {
				return message.channel.send({
					embeds: [
						error({
							message: message,
							description: err.message,
						}),
					],
				})
			})
	},
}

export default KickCommand
