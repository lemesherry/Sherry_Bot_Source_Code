const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'queue',
    aliases: ['q', 'list'],
    category: 'music',
    utilisation: '{prefix}queue',
    voiceChannel: true,

    async execute(client, message, args) {

        const queue = player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            return sendEmbed('There are no songs in the queue').catch(console.error);
        };

        const track = queue.current;

        if (!queue.tracks[0]) return message.channel.send({ embeds: [new MessageEmbed().setColor('BLACK').setDescription(`**No songs to play next add songs by \`${client.config.app.px}play <song name>\`**`).setThumbnail(track.thumbnail).addField('Now Playing', `[\`${String(track.title).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 100)}\`](${track.url})-\`${track.duration}\``, true).addField('Volume', `\`${queue.volume}%\``, true).setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`)] }).catch(console.error);

        let currentPage = 0;
        const embeds = generateQueueEmbed(message, queue, track);

        const queueEmbed = await message.channel.send({ content: `> **Page:** **\`${currentPage + 1}\`** **Of** **\`${embeds.length}\`**`, embeds: [embeds[currentPage]] });

        try {
            await queueEmbed.react('⬅️');
            await queueEmbed.react('🗑');
            await queueEmbed.react('➡️');
        } catch (error) {
            console.error(error);
            sendEmbed(message, error.message).catch(console.error);
        };

        const filter = (reaction, user) => ['⬅️', '🗑', '➡️'].includes(reaction.emoji.name) && message.author.id === user.id;
        const collector = queueEmbed.createReactionCollector(filter, { time: 60000, });

        collector.on('collect', async (reaction) => {
            try {
                if (reaction.emoji.name === '➡️') {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        queueEmbed.edit({ content: `> **Page:** **\`${currentPage + 1}\`** **Of** **\`${embeds.length}\`**`, embeds: [embeds[currentPage]] });
                    };
                } else if (reaction.emoji.name === '⬅️') {
                    if (currentPage !== 0) {
                        --currentPage;
                        queueEmbed.edit({ content: `> **Page:** **\`${currentPage + 1}\`** **Of** **\`${embeds.length}\`**`, embeds: [embeds[currentPage]] });
                    };
                } else {
                    collector.stop();
                    reaction.message.reactions.removeAll();
                };

                await reaction.users.remove(message.author.id);
            } catch (e) {
                console.error(e);
                collector.stop();
                return sendEmbed(message, e.message).catch(console.error);
            };
        });

        function generateQueueEmbed(message, queue, track) {
            let embeds = [];
            let k = 10;

            try {
                for (i = 0; i < queue.tracks.length; i += 10) {
                    const current = queue.tracks.slice(i, k);
                    let x = i;
                    k += 10;
                    const info = current.map((track) => `**${++x}-**[\`${String(track.title).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 100)}\`](${track.url})-\`${track.duration}\``).join("\n");

                    const embed = new MessageEmbed().setColor('BLACK')
                        .setTitle(`📑 **Queued Songs ${queue.tracks.length}**`)
                        .setDescription(`**Now Playing:** \n> [\`${String(track.title).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 100)}\`](${track.url})-\`${track.duration}\`\n\n${info}`)
                        .setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`);

                    embeds.push(embed);
                };
                return embeds;
            } catch (e) {
                console.error(e);
            };
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