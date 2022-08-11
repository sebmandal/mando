import { embed } from '../../core/utils'
import { Command } from '../../core/customTypes'
import commands, { allCommands } from '../../core/commandRegistry'

const HelpCommand: Command = {
	name: 'help',
	description:
		'The help command, also what you are seeing on screen right now!',
	usage: 'help covid (second argument optional)',
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		// if the first argument (optional) is equal to any command or alias, the command variable will be said command
		const command = allCommands.find(
			(command) =>
				command.name === args[0] || command.alias.includes(args[0])
		)

		if (command) {
			// if the script above finds a command, it'll send back the command's information

			let title = `${process.env.prefix}${args[0]}`
			let fields = [
				{
					name: `Information about the ${process.env.prefix}${command.name} command`,
					value: command.description,
					inline: false,
				},
				{
					name: `Example usage`,
					value: '`' + `${process.env.prefix}${command.usage}` + '`',
					inline: false,
				},
				{
					name: `Aliases`,
					value: `${command.alias.join(', ') || 'No aliases.'}`,
					inline: false,
				},
			]

			await message.channel.send({
				embeds: [
					embed({ message: message, title: title, fields: fields }),
				],
			})
		} else {
			// if there is no command found, the script will just send back the vanilla help message

			// commands = [{category info}, {category 2 info}, {category 3 info}];
			// looping through the commands and appending
			let categories: object[] = []
			commands.forEach((category) => {
				categories.push(category)
			})

			let title = `Mando's abilities`
			let description = `To see a detailed help for a specific command, send ${process.env.prefix}help (command)`

			let fields = [
				{
					name: "Mando's source code",
					value: 'https://github.com/sebmandal/Mando',
					inline: false,
				},
			]

			// looping through the categories, creating a field for each one with the containing commands and pushing all of it into the fields variable
			// as this is always adding the category as the first field, I'm reversing the category array so the order is correct
			categories.reverse().forEach((category: any) => {
				fields.unshift({
					name: category.name,
					value: category.commands
						.map((command: Command) => command.name)
						.join(',\n'),
					inline: false,
				})
			})

			// sending the vanilla help message
			await message.channel.send({
				embeds: [
					embed({
						message: message,
						title: title,
						description: description,
						fields: fields,
					}),
				],
			})
		}
	},
}

export default HelpCommand
