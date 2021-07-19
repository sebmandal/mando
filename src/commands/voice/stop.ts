import { Command } from "../../core/customTypes";

const StopVoiceCommand: Command = {
	name: "stop",
	description: "Stop the current track and make Mando leave the VC.",
	usage: "stop",
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel)
			return message.channel.send(
				"You need to be in a voice channel to stop the music!"
			);

		await voiceChannel.leave();
		await message.react(":thumbs_up:");

		return;
	},
};

export default StopVoiceCommand;
