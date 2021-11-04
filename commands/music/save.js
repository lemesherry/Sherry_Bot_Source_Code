const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'save',
    aliases: ['sv', 'grab', 'dmnp'],
    category: 'music',
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const track = queue.current;

        if (!queue || !queue.playing)
            return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

        const saveembed = new MessageEmbed();

        saveembed.setColor('BLACK');
        saveembed.setThumbnail(track.thumbnail);
        saveembed.setDescription(`[\`${String(track.title).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 100)}\`](${track.url})-\`${track.duration}\``);
        saveembed.setTimestamp();
        saveembed.setFooter('UWU 😙', client.config.app.AVATARURL);

        message.author.send({ embeds: [saveembed] }).then(() => {
            sendEmbed(`I have sent you current playing song in **DM** ✅ [${message.author}}]`);
            return;
        }).catch(error => {
            return sendEmbed(`Unable to send you **DM** please try again [${message.author}]`);
        });

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