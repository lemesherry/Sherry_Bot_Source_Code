const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'music',
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        try {
            if (args.join('').toLowerCase() === 'queue') {
                if (queue.repeatMode === 1)
                    return sendEmbed(`${client.config.emojis.erroremoji} You must first disable the current music loop by (${client.config.app.px}loop) [${message.author}]`);

                const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

                return sendEmbed(success ? `Queue loop is now ${queue.repeatMode === 0 ? `disabled${client.config.emojis.disabledemoji}` : `enabled${client.config.emojis.enabledemoji}`}` : `${client.config.emojis.erroremoji} Something went wrong please try again [${message.author}]`);
            } else {
                if (queue.repeatMode === 2)
                    return sendEmbed(`${client.config.emojis.erroremoji} You must first disable the queue loop by (${client.config.app.px}loop queue) [${message.author}]`);

                const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

                return sendEmbed(success ? `Repeat mode is now ${queue.repeatMode === 0 ? 'disabled' : 'enabled'} the current music will be repeated endlessly (you can loop the queue with the ${client.config.app.px}queue) 🔂` : `${client.config.emojis.erroremoji} Something went wrong please try again [${message.author}]`);
            };
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