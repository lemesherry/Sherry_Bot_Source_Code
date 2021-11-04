const { MessageEmbed } = require('discord.js');
const lyricsFinder = require('lyrics-finder');

module.exports = {
    name: 'lyrics',
    aliases: ['ly'],
    category: 'music',
    utilisation: `{prefix}lyrics \n or ${client.config.app.px}lyrics <songname>`,
    voiceChannel: true,

    async execute(client, message, args) {

        const queue = player.getQueue(message.guild.id);
        const track = queue.current;

        let lyrics = null;

        if (args[0]) {
            try {
                lyrics = await lyricsFinder(args.join(' '), '');
                if (!lyrics) {
                    lyrics = `No lyrics found\nPlease double check the spellings and\nTry: \`\`\`yml\n${client.config.app.px}lyrics <song name> again\n\`\`\``;
                };
                let lyricsEmbed = new MessageEmbed().setColor('BLACK').setTitle(`Lyrics`).setDescription(`**For: \`${args.join(' ')}\`**\n${lyrics}`).setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`).setTimestamp();

                if (lyricsEmbed.description.length >= 2048) {
                    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
                };
                
                return message.channel.send({ embeds: [lyricsEmbed] }).catch(console.error);
            } catch (error) {
                lyrics = `No lyrics found\nPlease double check the spellings and\nTry: \`\`\`yml\n${client.config.app.px}lyrics <song name> again\n\`\`\``;
            };
        };

        if (!args[0]) {
            try {
                if (!queue || !queue.playing) {
                    return message.channel.send({ embeds: [new MessageEmbed().setColor('BLACK').setAuthor("No music is currently playing", `${client.config.app.AVATARURL}`)] }).catch(console.error);
                };
                lyrics = await lyricsFinder(track.title, '');

                if (!lyrics) {
                    lyrics = `No lyrics found\nTry: \`\`\`yml\n${client.config.app.px}lyrics <song name> instead\n\`\`\``;
                };
            } catch (error) {
                lyrics = `No lyrics found\nTry: \`\`\`yml\n${client.config.app.px}lyrics <song name> instead\n\`\`\``;
            };

            let lyricsEmbed = new MessageEmbed().setColor('BLACK').setTitle(`Lyrics`).setDescription(`**For: **[\`${String(track.title).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 100)}\`](${track.url})\n${lyrics}`).setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`).setTimestamp();

            if (lyricsEmbed.description.length >= 2048) {
                lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
            };
            return message.channel.send({ embeds: [lyricsEmbed] }).catch(console.error);
        };
        return;
    },
};