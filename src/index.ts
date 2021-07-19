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

import commandHandler from "./core/commandHandler";

import Discord from "discord.js";
const client = new Discord.Client();

import dotenv from "dotenv";
dotenv.config();

const prefix = process.env.prefix || "!";

client.on("ready", () => {
	return console.log("Mando is ready!");
});

client.on("message", async (message: Discord.Message) => {
	if (!message.content.startsWith(prefix)) return;
	return commandHandler(client, message);
});

client.login(process.env.token);
