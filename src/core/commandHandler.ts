import Discord from "discord.js";
import { allCommands as commands } from "./commandRegistry";

export default async (client: Discord.Client, message: Discord.Message) => {
	const args = message.content.slice(process.env.prefix?.length).split(" ");
	// example
	// input = !food cheddar cheese, 1 cubic inch
	// args  = ["food", "cheddar", "cheese,", "1", "cubic", "inch"]

	const input_command = args[0].toLowerCase();
	// here it tries to find a command with a matching name or alias to the input
	let command = await commands.find(
		(command) =>
			command.name === input_command || command.alias.includes(input_command)
	);

	// If the command exists, it'll run the run() script inside of the command
	if (command) {
		args.shift(); // get rid of the command, just leaves the args themselves
		return command.run(client, message, args);
	}

	// if the command doesn't exists, it'll reply with an error message
	// the message is deleted after 5 seconds
	const msg = await message.reply("Command not found!");
	return await setTimeout(() => msg.delete(), 5000);
};
