const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['cq', 'clear queue', 'clearqueue'],
    category: 'music',
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        if (!queue.tracks[0])
            return sendEmbed(`${client.config.emojis.erroremoji} There are no songs in the queue after currently playing song [${message.author}]`);

        try {

            await queue.clear();
            return message.react(`🗑️`).catch(console.error);
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