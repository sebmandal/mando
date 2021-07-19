import Discord from "discord.js";
import commands from "./commandRegistry";

export default async (client: Discord.Client, message: Discord.Message) => {
	const args = message.content.slice(process.env.prefix?.length).split(" ");
	const input_command = args[0].toLowerCase();

	let command = await commands.find(
		(command) =>
			command.name === input_command || command.alias.includes(input_command)
	);

	if (command) {
		args.shift(); // get rid of the command, just leaves the args themselves
		return command.run(client, message, args);
	}

	const msg = await message.reply("Command not found!");
	await setTimeout(() => msg.delete(), 5000);
};
