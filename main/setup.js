const fs = require("fs");

module.exports = async (client) => {
	// pushing the commands information to the array
	// f = current loop file name
	const cs = fs
		.readdirSync("./commands")
		.map((f) => require(`../commands/${f}`));

	// loading the commands into the client
	// csi = commands, but only the command.info object
	// c = current loop item
	const csi = cs.map((c) => c.info);
	client.api.application(client.user.id).commands.set(csi);

	// checking for a match in the commands and executing it
	// i = interaction
	// c = command
	// x = current loop command
	client.on("interactionCreate", async (i) => {
		if (!i.isCommand()) return;

		const c = i.commandName.toLowerCase();
		// const args = i.options;

		cs.forEach(async (x) => {
			if (c === x.info.data.name) {
				// posting the callback to the client
				return await client.api
					.interactions(i.id, i.token)
					.callback.post(x.callback);
			}
		});
	});

	console.log(`Listening to Discord on ${client.user.tag}!`);
};
