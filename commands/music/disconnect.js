const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'disconnect',
    aliases: ['dc', 'leave'],
    category: 'music',
    utilisation: '{prefix}disconnect',
    voiceChannel: true,

    async execute(client, message) {

        const queue = player.getQueue(message.guild.id);

        try {
            
            queue.destroy(true);
            return message.react(client.config.emojis.successemoji).catch(console.error);
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