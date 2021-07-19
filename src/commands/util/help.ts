import newEmbed from "../../core/customEmbed";
import { Command } from "../../core/customTypes";
import commands from "../../core/commandRegistry";

const HelpCommand: Command = {
	name: "help",
	description:
		"The help command, also what you are seeing on screen right now!",
	usage: "help covid (second argument optional)",
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const command = commands.find((command) => command.name === args[0]);
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
			];

			await message.channel.send(newEmbed(message, title, fields));
		} else {
			let title = `Mando's abilities`;
			let fields = [
				{
					name: "Commands",
					value: `${commands.map((command) => command.name).join(", \n")}`,
					inline: false,
				},
				{
					name: "Mando's source code",
					value: "https://github.com/sebmandal/Mando",
					inline: false,
				},
			];

			await message.channel.send(newEmbed(message, title, fields));
		}
	},
};

export default HelpCommand;
