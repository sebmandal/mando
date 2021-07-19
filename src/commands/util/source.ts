import { embed } from "../../core/embed";
import { Command } from "../../core/customTypes";
import commands from "../../core/commandRegistry";

const SourceCommand: Command = {
	name: "source",
	description: "Sends back the source code link",
	usage: "source",
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		return await message.channel.send(
			embed(
				message,
				"Source",
				"[Link](https://github.com/sebmandal/mando)",
				undefined,
				"https://github.com/sebmandal/mando"
			)
		);
	},
};

export default SourceCommand;
