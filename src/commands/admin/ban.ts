import { embed, error } from "../../core/utils";
import { Command } from "../../core/customTypes";

const BanCommand: Command = {
	name: "ban",
	description: "Ban people from the guild.",
	usage: `ban @user#1337 (or user's id)`,
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		// checking if a user is specified,
		// the author is able to ban them themselves,
		// and checking if the bot is able to ban the specified user.
		if (!message.member.hasPermission("BAN_MEMBERS"))
			return message.reply("You cannot ban members");

		let member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);

		if (!member)
			return message.reply("Please specify a member for me to ban them");

		let reason = args.join(" ");
		if (!reason) reason = "No reason given.";

		if (!member.bannable)
			return message.channel.send(
				error({
					message: message,
					description: "This member is not bannable.",
				})
			);

		member
			.ban(reason)
			.then(() => {
				message.channel.send(
					embed({
						message: message,
						title: `${member.tag} was banned.`,
					})
				);
			})
			.catch((err: any) => {
				return message.channel.send(
					error({
						message: message,
						description: err.message,
					})
				);
			});
	},
};

export default BanCommand;
