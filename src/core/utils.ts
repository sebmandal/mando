import Discord from 'discord.js'
import { Embed, ErrorEmbed } from './customTypes'

export const embed = (data: Embed) => {
	const embed = new Discord.MessageEmbed()
		.setAuthor(
			data.message.author.tag,
			`https://cdn.discordapp.com/avatars/${data.message.author.id}/${data.message.author.avatar}.webp?size=512`
		)
		.setTitle(data.title)
		.setThumbnail(data.thumbnailUrl || '')
		.setURL(data.url || '')
		.setImage(data.imageUrl || '')
		.setColor('#E97451')
		.setFooter(data.footer || 'Powered by Mando under MNDL® Ltd.')

	data.fields ? embed.addFields(data.fields) : {}
	data.description ? embed.setDescription(data.description) : {}

	return embed
}

export const error = (data: ErrorEmbed) => {
	return new Discord.MessageEmbed()
		.setAuthor(
			data.message.author.tag,
			`https://cdn.discordapp.com/avatars/${data.message.author.id}/${data.message.author.avatar}.webp?size=512`
		)
		.setTitle(data.title || 'An error occured. ')
		.setDescription(data.description)
		.setColor('#E97451')
		.setFooter('Powered by Mando under MNDL® Ltd.')
}
