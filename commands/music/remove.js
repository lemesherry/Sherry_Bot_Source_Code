const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove',
    aliases: ['rm'],
    category: 'music',
    utilisation: '{prefix}remove',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        if (!queue.tracks.length)
            return sendEmbed(`${client.config.emojis.erroremoji} There are no songs in the queue after currently playing song [${message.author}]`);

        if (!args.length)
            return sendEmbed(`\`\`\`yml\nUsage: ${client.config.app.px}remove <song number in the queue>\nExample: ${client.config.app.px}remove 4\n\`\`\``);

        if (isNaN(args[0]))
            return sendEmbed(`${client.config.emojis.erroremoji} That is not a valid number`);

        if (args[0] > queue.tracks.length)
            return sendEmbed(`${client.config.emojis.erroremoji} There are only \`${queue.tracks.length}\` songs in the queue`);

        try {

            const song = parseInt(args[0]) - 1;
            const success = queue.remove(song);

            if (success) sendEmbed(`Removed [${success.title}](${success.url}) \`(${args[0]})\` [${message.author}]`);
            // else {
            //     if (isNaN(args[2]))
            //     return sendEmbed(`${client.config.emojis.erroremoji} That is not a valid number`);

            //     if (args[2] > queue.tracks.length)
            //     return sendEmbed(`${client.config.emojis.erroremoji} There are only \`${queue.tracks.length}\` songs in the queue`);

            //     let rmstart = parseInt(args[0] -1);
            //     let rmend = parseInt(args[0])-parseInt(args[2]);

            //     // let removedaray = []
            //     // let r = 0;

            //     const success = queue.tracks.splice(rmstart, rmend);

            //     for (let i = 0; i < removedaray; i += Number(args[0])-Number(args[2])) {
            //         queue.remove(parseInt(args[2]));
            //     }
            //     if (success) sendEmbed(`Removed \`${parseInt(rmend)}\` from the queue [${message.author}]`);
            // };
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