const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'filterlist',
    aliases: ['filters', 'filterslist'],
    category: 'info',
    utilisation: '{prefix}filterlist',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        try {
            const enabled = queue.getFiltersEnabled().map((x) => '`' + x + '`').join(', ');
            const notenabled = queue.getFiltersDisabled().map((x) => '`' + x + '`').join(', ');

            const filters = new MessageEmbed().setColor('BLACK').setAuthor('Filters').setDescription(`**To use filters type:**\`\`\`yml\n ${client.config.app.px}filter or ${client.config.app.px}f <the filter>. \nExample: ${client.config.app.px}filter 8d.\`\`\`\nType the command again to remove the filter`);

            filters.addFields(
                { name: 'Enabled filters', value: enabled ? enabled : `no filters are enabled yet` },
                { name: 'Available filters', value: notenabled },
            ).setTimestamp().setFooter('Music comes first - Made with heart by Sherry ❤️', client.config.app.AVATARURL);

            message.channel.send({ embeds: [filters] }).catch(console.error);
        } catch (e) {
            console.error(e);
            return sendEmbed(`${client.config.emojis.erroremoji} Something went wrong please try again [${message.author}]`);
        };

        async function sendEmbed(specificreply) {

            try {
                const resultsEmbed = new MessageEmbed();
                resultsEmbed.setColor('BLACK');
                resultsEmbed.setDescription(specificreply);
                resultsEmbed.setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`);

                await message.channel.send({ embeds: [resultsEmbed] });
            } catch (e) {
                console.error(e);
            };
            return;
        };
    },
};