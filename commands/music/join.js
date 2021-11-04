const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'join',
    aliases: ['connect', 'summon'],
    category: 'music',
    utilisation: '{prefix}join',
    voiceChannel: true,

    async execute(client, message, args) {

        const queue = player.getQueue(message.guild.id);
        const mainChannel = message.member.voice.channel;
        const permissions = mainChannel.permissionsFor(message.client.user);

        if (!permissions.has('CONNECT')) {
            return sendEmbed(`**I don't have permission to join that channel**`).catch(console.error);
        };
        if (!permissions.has('SPEAK')) {
            return sendEmbed(`**I don't have permission to speak in that channel**`).catch(console.error);
        };

        if (!args[0]) {
            try {
                let channel = mainChannel;
                if (queue) {
                    await queue.connect(channel);
                    if (!queue.playing) await queue.play();
                    await sendEmbed(`joined: ${message.guild.me.voice.channel}`);
                    return;
                }
                else {
                    const cqueue = await player.createQueue(message.guild, {
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
                    await cqueue.connect(channel);
                    await sendEmbed(`joined: ${message.guild.me.voice.channel}`);
                    return;
                };
            } catch (e) {
                await player.deleteQueue(message.guild.id);
                console.error(e);
                return sendEmbed(`${client.config.emojis.erroremoji} Can't join specified channel`);
            };
        };

        if (args[0]) {
            try {
                const joinChannel = message.guild.channels.cache.get(args[0]);
                const permissionsJoinChannel = joinChannel.permissionsFor(message.client.user);

                if (!permissionsJoinChannel.has('CONNECT')) {
                    return sendEmbed(`**I don't have permission to join that channel**`).catch(console.error);
                };
                if (!permissionsJoinChannel.has('SPEAK')) {
                    return sendEmbed(`**I don't have permission to speak in that channel**`).catch(console.error);
                };
        
                let channel = message.guild.channels.cache.get(args[0]);
                if (queue) {
                    await queue.connect(channel);
                    if (!queue.playing) await queue.play();
                    await sendEmbed(`joined: ${message.guild.me.voice.channel}`);
                    return;
                }
                else {
                    const cqueue = await player.createQueue(message.guild, {
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
                    await cqueue.connect(channel);
                    await sendEmbed(`joined: ${message.guild.me.voice.channel}`);
                    return;
                };
            } catch (e) {
                await player.deleteQueue(message.guild.id);
                console.error(e);
                return sendEmbed(`${client.config.emojis.erroremoji} Can't join specified channel`);
            };
        } else if (!queue) {
            const cqueue = await player.createQueue(message.guild, {
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
                if (!cqueue.connection)
                    await cqueue.connect(message.member.voice.channel);
                return sendEmbed(`joined: ${message.guild.me.voice.channel}`);
            } catch (e) {
                console.error(e);
                await player.deleteQueue(message.guild.id);
                return sendEmbed(`${client.config.emojis.erroremoji} Can't join your channel`);
            };
        } else return sendEmbed(`I am already playing somewhere else`);

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
