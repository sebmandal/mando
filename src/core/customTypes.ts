import Discord from "discord.js";

export interface Command {
	name: string;
	alias: string[];
	description: string;
	usage: string;
	run: (
		client: Discord.Client,
		message: Discord.Message,
		args: string[]
	) => any;
}

export interface Embed {
	message: any;
	title: string;
	description?: string;
	fields?: Discord.EmbedFieldData[];
	footer?: string | object;
	url?: string;
	imageUrl?: string;
	thumbnailUrl?: string;
}

export interface ErrorEmbed {
	message: any;
	title?: string;
	description: string;
	footer?: string | object;
}
