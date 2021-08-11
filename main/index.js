//     /------------------------------------\
//     | https://github.com/sebmandal/mando |
//     |       Mando the Discord bot        |
//     |         author: sebmandal          |
//     |            version 2.0             |
//     |                                    |
//     |              PACKAGES              |
//     |       Node.js      ^16.6.1         |
//     |       Typescript   ^4.3.5          |
//     |       Discord.js   ^13.1.0         |
//     |                                    |
//     \------------------------------------/

//dotenv setup
const dotenv = require("dotenv");
dotenv.config();

//bot setup
const Discord = require("discord.js");
const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.DIRECT_MESSAGES,
	],
});

client.on("ready", async () => {
	const onReady = require("./onReady");
	await onReady(client);
});

client.on("interactionCreate", async (i) => {
	const onInteractionCreate = require("./onInteractionCreate");
	await onInteractionCreate(client, i);
});

client.login(process.env.DISCORD_TOKEN);
