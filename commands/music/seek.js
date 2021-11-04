const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'seek',
    aliases: ['forward'],
    category: 'music',
    utilisation: '{prefix}seek 5s, 1m',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        if (!args[0])
            return sendEmbed(`Try: \n\`\`\`yml\n${client.config.app.px}seek <time to seek to like 10s, 10 seconds, 5m>\nEx: ${client.config.app.px}seek 2m\n\`\`\``);

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS)
            return sendEmbed(`${client.config.emojis.erroremoji} The song is not that long [${message.author}]\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`);

        try {
            
            await queue.seek(timeToMS);

            return sendEmbed(`seeked to **${ms(timeToMS, { long: true })}** ✅`);
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