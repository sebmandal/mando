import kick from "../commands/admin/kick";
import ban from "../commands/admin/ban";

import covid from "../commands/api/covid";
import shorten from "../commands/api/shorten";
import genius from "../commands/api/genius";
import food from "../commands/api/food";
import donald from "../commands/api/donald";

import avatar from "../commands/util/avatar";
import steal from "../commands/util/steal-emote";
import support from "../commands/util/support-thread";
import source from "../commands/util/source";
import help from "../commands/util/help";

export default [
	{
		name: "Moderation Commands",
		commands: [kick, ban],
	},
	{
		name: "API Commands",
		commands: [covid, shorten, genius, food, donald],
	},
	{
		name: "Utility Commands",
		commands: [avatar, steal, support, source, help],
	},
];

export const allCommands = [
	kick,
	ban,
	covid,
	shorten,
	genius,
	food,
	donald,
	avatar,
	steal,
	support,
	source,
	help,
];
