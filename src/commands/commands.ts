// command imports
import covid from "./virus_data";
import urlShortener from "./url_shortener";

const commands = [
	{ name: "covid", run: covid },
	{ name: "short", run: urlShortener },
];

// Try to see if input matches any imports
const tryCommand = async (client: any, message: any, args: string[]) => {
	commands.forEach(async (command) => {
		if (command.name === args[0]) {
			await command.run(client, message, args);
		}
	});
};

export default tryCommand;
