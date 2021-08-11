const fs = require("fs");

module.exports = (client, interaction) => {
	if (!interaction.isCommand()) return;

	// looping through ../commands to find the command files
	const commands = fs
		.readdirSync("./commands")
		.map((currentFile) => require(`../commands/${currentFile}`));

	const command = interaction.commandName.toLowerCase();
    const arguments = interaction.options;

	// checking for a command name match, if it matches, execute it
	commands.forEach(async (x) => {
		if (command === x.name) {
			// posting the callback to the client
            return await x
                .run(client, interaction, arguments)
                .catch((error) => interaction.followUp(`Sorry! An error occured with the following message:\n\`${error.message}\``));
		}
	});
};
