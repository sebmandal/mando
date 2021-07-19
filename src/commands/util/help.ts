import { embed } from "../../core/embed";
import { Command } from "../../core/customTypes";
import commands, { allCommands } from "../../core/commandRegistry";

const HelpCommand: Command = {
	name: "help",
	description:
		"The help command, also what you are seeing on screen right now!",
	usage: "help covid (second argument optional)",
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const command = allCommands.find((command) => command.name === args[0]);
		if (command) {
			let title = `${args[0]}`;
			let fields = [
				{
					name: `Information about ${args[0]}`,
					value: command.description,
					inline: false,
				},
				{
					name: `Example usage`,
					value: `${process.env.prefix}${command.usage}`,
					inline: false,
				},
				{
					name: `Aliases`,
					value: `${command.alias.join(", ") || "No aliases."}`,
					inline: false,
				},
			];

			await message.channel.send(
				embed({ message: message, title: title, fields: fields })
			);
		} else {
			let categories: object[] = [];
			commands.forEach((category) => {
				categories.push(category);
			});

			let title = `Mando's abilities`;
			let description = `To see a detailed help for a specific command, send ${process.env.prefix}help (command)`;

			let fields = [];
			categories.forEach((category: any) => {
				fields.push({
					name: category.name,
					value: category.commands
						.map((command: Command) => command.name)
						.join(",\n"),
					inline: false,
				});
			});

			fields.push({
				name: "Mando's source code",
				value: "https://github.com/sebmandal/Mando",
				inline: false,
			});

			await message.channel.send(
				embed({
					message: message,
					title: title,
					description: description,
					fields: fields,
				})
			);
		}
	},
};

export default HelpCommand;
