const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'deletemsg',
  aliases: ['clearmsg'],
  category: 'admin',
  utilisation: `{prefix}deletemsg <number of messages>`,

  async execute(client, message, args) {

    const notowner = new MessageEmbed();
    notowner.setColor('BLACK');
    notowner.setDescription(`${client.config.emojis.erroremoji} You don't have \`MANAGE SERVER\` permission`);
    notowner.setFooter(`${client.config.app.OWNER}`, `${client.config.app.AVATARURL}`);

    if (message.author.id == 584534092901646346 || message.author.id == 603948445362946084 || message.member.hasPermission('MANAGE_GUILD'))
      try {

        setTimeout(() => message.delete().catch(console.error), 1);

        if (!args[0]) {
          return sendEmbed(`Try: \n\`\`\`html\n${client.config.app.px}deletemsg <number of messages>\n\`\`\``).catch(console.error);
        };
        if (isNaN(args[0])) {
          return sendEmbed(`${client.config.emojis.erroremoji} Not a valid number`).catch(console.error);
        };
        if (args[0] > 1000) {
          return sendEmbed(`${client.config.emojis.erroremoji} Can not delete more than 1000 messages at a time`).catch(console.error);
        };
        if (args[0] < 1) {
          return sendEmbed(`${client.config.emojis.erroremoji} You must delete at least 1 message`).catch(console.error);
        };
        await message.channel.messages.fetch({ limit: args[0] }).then(messages => { message.channel.bulkDelete(messages).catch(console.error); });
      } catch (error) {
        console.error(error);
        return sendEmbed(`${client.config.emojis.erroremoji} Can not delete messages older than 14 days`)
      }
    else {
      return message.reply({ embeds: [notowner] }).catch(console.error);
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