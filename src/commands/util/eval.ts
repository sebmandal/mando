import Command from "../../core/commandType";

const EvalCommand: Command = {
	name: "eval",
	description: "Eval.",
	usage: process.env.prefix + "eval console.log('pepec10');",
	run: async (client: any, message: any, args: string[]): Promise<any> => {
		if (message.author.id != "399596706402009100") {
			return;
		} else {
			args.shift();
			return eval(args.join(" "));
		}
	},
};

export default EvalCommand;
