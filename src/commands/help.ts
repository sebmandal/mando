import { getCommandNames, findCommand } from "../commands";
import newEmbed from "../embed";
import Discord from "discord.js";
import dotenv from "dotenv";
dotenv.config();

// to prettify all of this (capitalizing first letter)
function CFL(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const usage = `${process.env.prefix}help (command optional)`;

const info = `The help command displays all commands or helpful information about individual commands.`;

const run = async (client: any, message: any, args: string[]) => {
	const command = await findCommand(args[1]);

	let title: string;
	let fields: Discord.EmbedFieldData[];

	if (command) {
		title = `${CFL(args[1])}`;
		fields = [
			{
				name: `Information about ${CFL(args[1])}`,
				value: command.info,
				inline: false,
			},
			{
				name: `Example usage`,
				value: "`" + command.usage + "`",
				inline: false,
			},
		];
	} else {
		title = `Mando's abilities`;
		fields = [
			{
				name: "Commands",
				value: `${await getCommandNames().join(", \n")}`,
				inline: false,
			},
			{
				name: "Mando's source code",
				value: "https://github.com/sebmandal/Mando",
				inline: false,
			},
		];
	}

	return message.channel.send(newEmbed(message, title, fields));
};

export { run, info, usage };
