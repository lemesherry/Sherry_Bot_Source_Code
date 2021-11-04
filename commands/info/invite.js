const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: ['invitelink', 'link'],
    category: 'info',
    utilisation: '{prefix}invite',

    async execute(client, message) {
        const embed = new MessageEmbed();

        try {
            embed.setColor('BLACK');

            embed.setTitle('Invite');

            embed.addField("To invite Sherry", "[Click here](https://discord.com/oauth2/authorize?client_id=845208558736113684&permissions=37088600&scope=bot)");

            embed.addField("To invite Sherry 2", "[Click here](https://discord.com/api/oauth2/authorize?client_id=846016087695163412&permissions=37088600&scope=bot)");

            embed.addField("To invite Sherry 3", "[Click here](https://discord.com/api/oauth2/authorize?client_id=846016138453975060&permissions=37088600&scope=bot)");

            embed.setFooter(client.config.app.OWNER, client.config.app.AVATARURL);

            message.channel.send({ embeds: [embed] }).catch(console.error);
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