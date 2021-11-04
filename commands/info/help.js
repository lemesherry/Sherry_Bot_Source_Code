const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    category: 'core',
    utilisation: '{prefix}help',

    execute(client, message, args) {

        try {
            if (!args[0]) {
                const infos = client.commands.filter(x => x.category == 'info').map((x) => '`' + x.name + '`').join(', ');
                const music = client.commands.filter(x => x.category == 'music').map((x) => '`' + x.name + '`').join(', ');
                const admin = client.commands.filter(x => x.category == 'admin').map((x) => '`' + x.name + '`').join(', ');

                const helpembed = new MessageEmbed();

                helpembed.setColor('BLACK');
                helpembed.setAuthor('Help');
                helpembed.setDescription(`**To use filters type:**\`\`\`yml\n ${client.config.app.px}filter or ${client.config.app.px}f (the filter). \nExample: ${client.config.app.px}filter 8d.\`\`\``);
                helpembed.addFields(
                    { name: 'Information', value: infos },
                    { name: 'Music', value: music },
                    { name: 'Admin', value: admin }
                );
                helpembed.setTimestamp();
                helpembed.setFooter('Music comes first - Made with heart by Sherry ❤️', client.config.app.AVATARURL);

                message.channel.send({ embeds: [helpembed] }).catch(console.error);
            } else {
                const command = client.commands.get(args.join(" ").toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

                if (!command) return sendEmbed(`${client.config.emojis.erroremoji} I cannot find that command!`);

                const extendedhelpembed = new MessageEmbed();

                extendedhelpembed.setColor('BLACK');
                extendedhelpembed.setAuthor('Help');
                extendedhelpembed.setDescription('Find information on the command provided.\nCompulsory `[]`, Optional `<>`.');
                extendedhelpembed.addFields(
                    { name: 'Name', value: command.name, inline: true },
                    { name: 'Category', value: command.category, inline: true },
                    { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                    { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.app.px), inline: true },
                );
                extendedhelpembed.setTimestamp();
                extendedhelpembed.setFooter('Music comes first - Made with heart by Sherry ❤️', client.config.app.AVATARURL);

                message.channel.send({ embeds: [extendedhelpembed] }).catch(console.error);
            };
        } catch (e) {
            console.error(e);
            return sendEmbed(`${client.config.emojis.erroremoji} Something went wrong please try again [${message.author}]`);
        }

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
