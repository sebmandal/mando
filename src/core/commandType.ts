import Discord from "discord.js";

export default interface Command {
	name: string;
	description: string;
	usage: string;
	run: (
		client: Discord.Client,
		message: Discord.Message,
		args: string[]
	) => any;
	alias?: string[];
}
