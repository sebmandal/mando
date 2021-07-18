// Discord.js v12.5.3
// Mando: A multifunctional Discord bot
// Language: Typescript
import dotenv from "dotenv";
import Discord from "discord.js";
import { execute } from "./commands";
const client: any = new Discord.Client();
dotenv.config();

client.on("ready", () => {
	console.log("Logged in as %s!", client.user.username);
});

client.on("message", async (message: any) => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	if (!message.content.startsWith(process.env.prefix)) return;

	let args: string[] = message.content
		.slice(process.env.prefix?.length || 0)
		.split(" ");

	await execute(client, message, args);
});

client.login(process.env.token);
