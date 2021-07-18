// command imports
import * as covid from "./virus_data";
import * as short from "./url_shortener";
import * as help from "./help";

// a registry of the commands
export const commands = [
	{ name: "covid", run: covid.run, usage: covid.usage, info: covid.info },
	{ name: "short", run: short.run, usage: short.usage, info: short.info },
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

export const commandHelp = async (c: string) => {
	for (let i = 0; i < commands.length; i++) {
		if (commands[i].name === c) {
			return commands[i];
		}
	}
};

export const doesCommandExist = async (c: string) => {
	for (let i = 0; i < commands.length; i++) {
		if (commands[i].name === c) {
			return true;
		}
	}

	return false;
};
