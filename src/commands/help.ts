import { getCommandNames, commandHelp, doesCommandExist } from "./commands";
import newEmbed from "../embed";
import Discord from "discord.js";
import dotenv from "dotenv";
dotenv.config();

// to prettify all of this (capitalizing first letter)
function CFL(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const run = async (client: any, message: any, args: string[]) => {
	let command: any = args.length > 1 ? await doesCommandExist(args[1]) : false;

	let title: string;
	let fields: Discord.EmbedFieldData[];

	if (command) {
		command = await commandHelp(args[1]);

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
		];
	}

	return message.channel.send(newEmbed(message, title, fields));
};

export const usage = `${process.env.prefix}help (command optional)`;
export const info = `The help command displays all commands or helpful information about individual commands.`;
