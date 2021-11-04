const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        const { channel } = message.member.voice;
        if (!args[0])
            return sendEmbed(`Try: \`\`\`html\n${client.config.app.px}play <Song Name> or <Youtube URL> or <Spotify URL>\n\`\`\``);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return sendEmbed(`**I don't have permission to join your channel**`).catch(console.error);
        };
        if (!permissions.has('SPEAK')) {
            return sendEmbed(`**I don't have permission to speak in your channel**`).catch(console.error);
        };

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        try {
            if (!res || !res.tracks.length)
                return sendEmbed(`${client.config.emojis.erroremoji} No results found`);

            const queue = await player.createQueue(message.guild, {
                leaveOnEnd: false,
                leaveOnStop: false,
                leaveOnEmpty: false,
                leaveOnEmptyCooldown: 600000,
                autoSelfDeaf: true,
                ytdlOptions: {
                    highWaterMark: 24,
                    filter: 'audioonly',
                    bitrate: 320,
                    quality: 'highestaudio',
                    // format: "audioonly",
                    liveBuffer: 60000,
                    dlChunkSize: 1024 * 1024 * 64,
                },
                // initialVolume: 100,
                // bufferingTimeout: 30000,
                metadata: message.channel
            });

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return sendEmbed(`${client.config.emojis.erroremoji} I can't join the voice channel please try again [${message.author}]`);
            }

            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

            if (!queue.playing) await queue.play();
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
