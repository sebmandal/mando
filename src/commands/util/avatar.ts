import { embed } from "../../core/utils";
import { Command } from "../../core/customTypes";
import commands, { allCommands } from "../../core/commandRegistry";

const AvatarCommand: Command = {
	name: "avatar",
	description: "Returns a person's avatar image.",
	usage: "avatar @user (@ is optional, default is message author)",
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const user = message.mentions.users.first() || message.author;
		return message.channel.send(
			embed({
				message: message,
				title: `${user.tag}'s avatar`,
				imageUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=4096`,
			})
		);
	},
};

export default AvatarCommand;
