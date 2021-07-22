import kick from "../commands/admin/kick";

import covid from "../commands/api/covid";
import shorten from "../commands/api/shorten";
import genius from "../commands/api/genius";
import food from "../commands/api/food";
import donald from "../commands/api/donald";

import source from "../commands/util/source";
import help from "../commands/util/help";

export default [
	{
		name: "Moderation Commands (administrator perms required)",
		commands: [kick],
	},
	{ name: "API Commands", commands: [covid, shorten, genius, food, donald] },
	{ name: "Utility Commands", commands: [source, help] },
];

export const allCommands = [
	kick,
	covid,
	shorten,
	genius,
	food,
	donald,
	source,
	help,
];
