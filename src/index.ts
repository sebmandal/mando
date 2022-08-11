//     /------------------------------------\
//     | https://github.com/sebmandal/mando |
//     |       Mando the Discord bot        |
//     |         author: sebmandal          |
//     |            version 2.0             |
//     |                                    |
//     |              PACKAGES              |
//     |       Node.js      v12.19.0        |
//     |       Typescript   v0.2.2          |
//     |       Discord.js   v12.5.3         |
//     |                                    |
//     \------------------------------------/

import Discord, { Intents } from "discord.js";
const client: Discord.Client = new Discord.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

import commandHandler from "./core/commandHandler";

import dotenv from "dotenv";
dotenv.config();

const prefix: string = process.env.PREFIX!;

client.on("ready", () => {
	client.user!.setActivity(
		`${prefix}help on ${client.guilds.cache.size} servers!`,
		{
			type: "LISTENING",
		}
	);
	return console.log("Mando is ready!");
});

client.on("messageCreate", async (message: Discord.Message) => {
	if (!message.content.startsWith(prefix)) return;
	message.content.substring(prefix.length);
	return await commandHandler(client, message);
});

client.login(process.env.TOKEN);
