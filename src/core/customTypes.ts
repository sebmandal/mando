import Discord from 'discord.js'

// Command Types

export interface Command {
	name: string
	alias: string[]
	description: string
	usage: string
	run: (
		client: Discord.Client,
		message: Discord.Message,
		args: string[]
	) => any
}

// Embed Types

export interface Embed {
	message: any
	title: string
	description?: string
	fields?: Discord.EmbedFieldData[]
	footer?: string
	url?: string
	imageUrl?: string
	thumbnailUrl?: string
}

export interface ErrorEmbed {
	message: any
	title?: string
	description: string
	footer?: string | object
}
