import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const cool: Command = {
	name: 'cool',
	description: 'Find your cool%',
	execute: async ({ channel, author }) => {
		const cool = Math.floor(Math.random() * 101);

		channel.send(
			new MessageEmbed()
				.setTitle(`${author.username}'s Cool Percentage`)
				.setDescription(`${author.username} is **${cool}%** cool`)
				.setFooter(cool === 69 ? 'nice' : null)
				.setColor(config.embedColor)
		);
	},
};

export default cool;
