import Discord from "discord.js";

export default (
	message: any,
	title: string,
	fields?: Discord.EmbedFieldData[],
	description?: Discord.EmbedFieldData[],
	footer?: string | object,
	url?: string,
	imageUrl?: string,
	thumbnailUrl?: string
) => {
	const embed = new Discord.MessageEmbed()
		.setAuthor(
			message.author.tag,
			`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=512`
		)
		.setTitle(title)
		.setThumbnail(thumbnailUrl || "")
		.setURL(url || "")
		.setImage(imageUrl || "")
		.setColor("#E97451")
		.setFooter(footer || "Powered by Mando under MNDL® Ltd.");

	fields ? embed.addFields(fields) : {};
	description ? embed.setDescription(description) : {};

	return embed;
};
