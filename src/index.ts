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

import discord from "discord.js";
const client = new discord.Client();

import dotenv from "dotenv";
dotenv.config();

import commandHandler from "./core/commandHandler";

const prefix = process.env.prefix || "!";

client.on("ready", () => {
	console.log("Mando is ready!");
});

client.on("message", async (message: discord.Message) => {
	if (!message.content.startsWith(prefix)) return;
	return commandHandler(client, message);
});

client.login(process.env.token);
