const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'announce',
  aliases: ['embed', 'announcement'],
  category: 'admin',
  utilisation: '{prefix}announce <anything>',

  async execute(client, message, args) {

    const notowner = new MessageEmbed();
    notowner.setColor('BLACK');
    notowner.setDescription(`${client.config.emojis.erroremoji} You don't have \`MANAGE SERVER\` permission`);
    notowner.setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`);

    if (message.author.id == 584534092901646346 || message.author.id == 603948445362946084 || message.member.hasPermission('MANAGE_GUILD')) {

      if (!args[0]) {
        return sendEmbed(`Try: \n\`\`\`html\n${client.config.app.px}announce <anything>\n\`\`\``).catch(console.error);
      };
      if (args[0] > 2048) {
        return sendEmbed(`${client.config.emojis.erroremoji} Announcement embed can not have more than 2048 letters`).catch(console.error);
      };
      try {
        if (message.content.startsWith(`${client.config.app.px}embed`)) {
          const definedmsg = message.content.slice(Number(client.config.app.px.length) + 5);
          const announceembed = new MessageEmbed();
          announceembed.setColor('BLACK');
          announceembed.setDescription(definedmsg);
          announceembed.setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`);

          message.channel.send({ content: `@everyone`, embeds: [announceembed] }).catch(console.error);

        } else if (message.content.startsWith(`${client.config.app.px}announcement`)) {
          const definedmsg = message.content.slice(Number(client.config.app.px.length) + 12);
          const announceembed = new MessageEmbed();
          announceembed.setColor('BLACK');
          announceembed.setDescription(definedmsg)
          announceembed.setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`);

          message.channel.send({ content: `@everyone`, embeds: [announceembed] }).catch(console.error);

        } else if (message.content.startsWith(`${client.config.app.px}announce`)) {
          const definedmsg = message.content.slice(Number(client.config.app.px.length) + 8);
          const announceembed = new MessageEmbed();
          announceembed.setColor('BLACK');
          announceembed.setDescription(definedmsg)
          announceembed.setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`);

          message.channel.send({ content: `@everyone`, embeds: [announceembed] }).catch(console.error);
        };

        return setTimeout(() => message.delete().catch(console.error), 30);
      } catch (e) {
        console.error(e);
        return sendEmbed(`${client.config.emojis.erroremoji} Something went wrong please try again [${message.author}]`);
      }
    } else {
      return message.channel.send({ embeds: [notowner] }).catch(console.error);
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
  }
};