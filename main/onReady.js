const fs = require("fs");

module.exports = async (client) => {
	// looping through ../commands to find the command files
	const commands = fs
		.readdirSync("./commands")
		.map((currentFile) => require(`../commands/${currentFile}`));

	// loading the commands into the client
	const commandsInformation = commands.map((currentItem) => {
		return {
			name: currentItem["name"],
			description: currentItem["description"],
			options: currentItem["options"],
		};
	});

	// settings the commands on the application
	await client.application?.commands.set(commandsInformation);

	console.log(`Listening to Discord on ${client.user.tag}!`);
};
