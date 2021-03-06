import { Message, MessageEmbed } from 'discord.js';
import config from '../../../config.json';
import { asCurrency } from '../../../util/utils';

const numberGuess: Command = {
	name: 'number',
	description: 'Earn more money (doubles your gamble)',
	usage: ['(number)'],
	execute: async ({ channel, author, args }) => {
		const bal = await author.getBalance();
		const price = parseInt(args[0]);
		const reward = price * 3;
		const answer = Math.floor(Math.random() * 11).toString();

		if (!args.length) {
			channel.send(`You didn't mention your bid`);
			return;
		}

		if (!price || price <= 0) {
			channel.send('You must enter a valid amount!');
			return;
		}

		if (bal < price) {
			channel.send(
				`You don't have enough money lol, you need ${asCurrency(price)}`
			);
			return;
		}

		await channel.send(
			new MessageEmbed()
				.setTitle(
					`Guess a number between 1 and 10 to get a prize of ${reward - price}!`
				)
				.setColor(config.embedColor)
		);

		const filter = (message: Message) => message.author.id === author.id;
		const collected = await channel.awaitMessages(filter, {
			max: 1,
			time: 10000,
		});

		const res = collected.first();
		if (!res) return;

		if (res.content === answer) {
			await author.add(reward);
			channel.send(`Correct! You won ${asCurrency(price)}!`);
		} else {
			channel.send(`Better luck next time! The correct answer was ${answer}`);
		}
	},
};

export default numberGuess;
