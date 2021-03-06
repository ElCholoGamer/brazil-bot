import config from '../../config.json';

const roleAdd: Command = {
	name: 'roleadd',
	description: 'adds a person to the Brazil role.',
	usage: ['[@Member]'],
	permissions: ['MANAGE_ROLES'],
	execute: async ({ message, channel, author, client }) => {
		const member = message.mentions.members?.first();
		const { brazilRole } = config;

		if (!member) {
			channel.send('You need to mention a member!');
			return;
		}

		const {
			user: { tag },
		} = member;

		if (member.roles.cache.get(brazilRole)) {
			channel.send(`${tag} has the Brazil role!`);
			return;
		}

		try {
			await member.roles.add(brazilRole);
			await client.models.UserTickets.upsert({
				user_id: author.id,
				until: Date.now() + 1000 * 60 * 60 * 24,
			});

			channel.send(`Added Brazil role to \`${tag}\`!`);
			await client.log(`${author.tag} added Brazil role to ${tag}`);
		} catch (err) {
			channel.send(
				'An error ocurred while adding the role! This is most likely an issue with permissions.'
			);
		}
	},
};

export default roleAdd;
