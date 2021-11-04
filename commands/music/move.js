const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'move',
    aliases: ['mv'],
    category: 'music',
    utilisation: '{prefix}move <number of song> <position in the queue>',
    voiceChannel: true,

    async execute(client, message, args) {
        let newQueue = player.getQueue(message.guild.id);

        if (!newQueue || !newQueue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        if (!newQueue.tracks[0]) {
            return sendEmbed("There is only one song in the queue").catch(console.error);
        };
        if (!args.length || args[0] === '0' || !args[1]) {
            return sendEmbed(`Try: \n\`\`\`yml\n${client.config.app.px}move <song Number>
            <specific number in the queue>\nEx: ${client.config.app.px}move 14 3\n\`\`\``).catch(console.error);
        };
        if (isNaN(args[0]) || isNaN(args[1])) {
            return sendEmbed(`Try: \n\`\`\`yml\n${client.config.app.px}move <song Number> <specific number in the queue>\nEx: ${client.config.app.px}move 14 3\n\`\`\``).catch(console.error);
        };
        if (args[0] > newQueue.tracks.length) {
            return sendEmbed(`There are only \`${newQueue.tracks.length}\` songs in the queue`).catch(console.error);
        };

        try {

            let songIndex = Number(args[0] - 1);
            let position = Number(args[1] - 1);

            // if (position == 0) 
            //     return sendEmbed(message, `${client.config.emojis.erroremoji} **Cannot move Song before Playing Song!**`);

            let song = newQueue.tracks[songIndex];
            //removing the song
            newQueue.tracks.splice(songIndex, 1);
            //Add it to a specific Position
            newQueue.insert(song, position);

            return sendEmbed(`Moved [${song.title}](${song.url}) to position \`(${position + 1})\` [${message.author}]`);
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