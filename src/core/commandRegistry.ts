import covid from "../commands/api/covid";
import shorten from "../commands/api/shorten";
import genius from "../commands/api/genius";
import food from "../commands/api/food";
import donald from "../commands/api/donald";
import stop from "../commands/voice/stop";
import play from "../commands/voice/play";
import source from "../commands/util/source";
import help from "../commands/util/help";

export default [
	{ name: "API Commands", commands: [covid, shorten, genius, food, donald] },
	{ name: "Voice Commands", commands: [stop, play] },
	{ name: "Utility Commands", commands: [source, help] },
];

export const allCommands = [
	covid,
	shorten,
	genius,
	food,
	donald,
	stop,
	play,
	source,
	help,
];
