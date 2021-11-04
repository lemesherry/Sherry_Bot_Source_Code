const { MessageEmbed } = require('discord.js');
const maxVol = client.config.opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol', 'v'],
    category: 'music',
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        const vol = parseInt(args[0]);

        if (!vol)
            return sendEmbed(`**The current volume is ${queue.volume}% ** 🔊\n*To change the volume enter a valid number between **\`1\`** and **\`${maxVol}\`**.*`);

        if (isNaN(args[0]))
            return sendEmbed(`Please enter a number between **\`1\`** and **\`${maxVol}\`** [${message.author}]`)

        if (queue.volume === vol)
            return sendEmbed(`Volume is already **\`${args[0]}\`** [${message.author}]`);

        if (vol < 0 || vol > maxVol)
            return sendEmbed(`Please enter a number between **\`1\`** and **\`${maxVol}\`** [${message.author}]`);

        try {

            const success = queue.setVolume(vol);

            return sendEmbed(`Volume has been changed to **${vol}** /**${maxVol}**% 🔊 [${message.author}]`);

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