const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.app.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member._roles.includes(roleDJ.id)) {
            return sendEmbed(`This command is reserved for members with the ${DJ.roleName} role on the server [${message.author}]`);
        }
    };

    if (!message.author.id === 584534092901646346) {
        if (cmd && cmd.voiceChannel) {
            if (!message.member.voice.channel)
                return sendEmbed(`You're not in a voice channel [${message.author}]`);

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
                return sendEmbed(`You are not in my voice channel [${message.author}]`);
        };
    };

    if (cmd) cmd.execute(client, message, args);

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
};