const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'filter',
    aliases: ['f'],
    category: 'music',
    utilisation: '{prefix}filter <filter name>',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0])
            return sendEmbed(`**Please specify a valid filter or type:**\`\`\`yml\n ${client.config.app.px}filterlist\n{to get list of available filters}.\`\`\``);

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) 
        return sendEmbed(`**Please specify a valid filter or type:**\`\`\`yml\n ${client.config.app.px}filterlist\n{to get list of available filters}.\`\`\``);

        try {

            const filtersUpdated = {};

            filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

            await queue.setFilters(filtersUpdated);

            return sendEmbed(`**__${filter}__ ${queue.getFiltersEnabled().includes(filter) ? `Enabled ${client.config.emojis.enabledemoji}` : `Disabled ${client.config.emojis.disabledemoji}`}**\n*__Note__: the longer the music is, the longer it will take to enable or disable a filter.*`);
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