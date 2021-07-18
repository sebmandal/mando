// command imports
import * as covid from "./commands/virus_data";
import * as short from "./commands/url_shortener";
import * as play from "./commands/voice/play";
import * as stop from "./commands/voice/stop";
import * as help from "./commands/help";

// a registry of the commands
export const commands = [
	{ name: "covid", run: covid.run, usage: covid.usage, info: covid.info },
	{ name: "short", run: short.run, usage: short.usage, info: short.info },
	{ name: "play", run: play.run, usage: play.usage, info: play.info },
	{ name: "stop", run: stop.run, usage: stop.usage, info: stop.info },
	{ name: "help", run: help.run, usage: help.usage, info: help.info },
];

export const getCommandNames = (): string[] => {
	return commands.map((c) => c.name);
};

// command processor, sees if the command being tried exists
export const execute = async (client: any, message: any, args: string[]) => {
	commands.forEach(async (command) => {
		if (command.name === args[0]) {
			await command.run(client, message, args);
		}
	});
};

export const findCommand = async (s: string) => {
	return commands.find((c) => c.name === s) || false;
};
