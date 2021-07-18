import Discord from "discord.js";

export default (
	message: any,
	title: string,
	fields: Discord.EmbedFieldData[],
	footer?: string | object,
	url?: string,
	imageUrl?: string,
	thumbnailUrl?: string
) => {
	return new Discord.MessageEmbed()
		.setAuthor(
			message.author.tag,
			`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=512`
		)
		.setTitle(title)
		.setThumbnail(thumbnailUrl || "")
		.setURL(url || "")
		.setImage(imageUrl || "")
		.addFields(fields)
		.setColor("#E97451")
		.setFooter(footer || "Powered by Mando under MNDL® Ltd.");
};
