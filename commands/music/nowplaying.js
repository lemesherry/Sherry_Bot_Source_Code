const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'playing', 'current'],
    category: 'music',
    utilisation: '{prefix}nowplaying',
    voiceChannel: false,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        try {
            const track = queue.current;

            const embed = new MessageEmbed();

            embed.setColor('BLACK');
            embed.setThumbnail(track.thumbnail);
            embed.setAuthor(track.title, client.config.app.AVATARURL);

            const methods = ['disabled', 'track', 'queue'];

            const progress = queue.createProgressBar();
            const timestamp = queue.getPlayerTimestamp();
            const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

            if (timestamp.progress == 'Infinity') {
                embed.setDescription(`Volume \`${queue.volume}%\`\nDuration \`${trackDuration}\`\nLoop mode \`${methods[queue.repeatMode]}\`\nRequested by [${track.requestedBy}]`);
            } else {
                embed.setDescription(`Volume \`${queue.volume}%\`\nLoop mode \`${methods[queue.repeatMode]}\`\nRequested by [${track.requestedBy}]\nDuration:${progress} (**${timestamp.progress}**%)`);
            };
            embed.setTimestamp();
            embed.setFooter(client.config.app.OWNER, message.author.avatarURL({ dynamic: true }));

            return message.channel.send({ embeds: [embed] }).catch(console.error);
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