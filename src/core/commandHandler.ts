import Discord from "discord.js";
import commands from "./commandRegistry";

export default async (client: Discord.Client, message: Discord.Message) => {
	const args = message.content.slice(1).split(" ");

	let command = await commands.find((command) => command.name === args[0]);
	if (command) return command.run(client, message, args);

	const msg = await message.reply("Command not found!");
	await setTimeout(() => msg.delete(), 5000);
};
