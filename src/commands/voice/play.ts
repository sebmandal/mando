import ytdl from "ytdl-core";
import ytSearch from "yt-search";
import { Command } from "../../core/customTypes";

const PlayVoiceCommand: Command = {
	name: "play",
	description: "Play music on the music player, be in a VC for this tho.",
	usage: "play https://www.youtube.com/watch?v=gfHbg53ykPY",
	alias: [],
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel)
			return message.channel.send(
				"You need to be in a channel to execute this command!"
			);
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT"))
			return message.channel.send("You dont have the correct permissions");
		if (!permissions.has("SPEAK"))
			return message.channel.send("You dont have the correct permissions");
		if (!args.length)
			return message.channel.send("You need to send the second argument!");

		const validURL = (str: string) => {
			var regex =
				/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
			if (!regex.test(str)) {
				return false;
			} else {
				return true;
			}
		};

		if (validURL(args[0])) {
			const connection = await voiceChannel.join();
			const stream = ytdl(args[0], { filter: "audioonly" });

			connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
				voiceChannel.leave();
				message.channel.send("leaving channel");
			});

			await message.reply(`:thumbsup: Now Playing ***Your Link!***`);

			return;
		}

		const connection = await voiceChannel.join();

		const videoFinder = async (query: string) => {
			const videoResult = await ytSearch(query);

			return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
		};

		const video = await videoFinder(args.join(" "));

		if (video) {
			const stream = ytdl(video.url, { filter: "audioonly" });
			connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
				voiceChannel.leave();
			});

			await message.reply(`:thumbsup: Now Playing ***${video.title}***`);
		} else {
			message.channel.send("No video results found");
		}
	},
};

export default PlayVoiceCommand;
