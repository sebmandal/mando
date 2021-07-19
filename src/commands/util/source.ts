import newEmbed from "../../core/customEmbed";
import { Command } from "../../core/customTypes";
import commands from "../../core/commandRegistry";

const SourceCommand: Command = {
	name: "source",
	description: "Sends back the source code link",
	usage: "source",
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		return await message.channel.send(
			newEmbed(
				message,
				"Source",
				[
					{
						name: "Mando's Source",
						value:
							"[ooOoO fancy hyperlink](https://github.com/sebmandal/mando)",
						inline: false,
					},
				],
				undefined,
				"https://github.com/sebmandal/mando"
			)
		);
	},
};

export default SourceCommand;
