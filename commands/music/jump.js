const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'jump',
  aliases: ['skipto', 'jumpto'],
  category: 'music',
  utilisation: '{prefix}jump <number of song to skipto>',
  voiceChannel: true,

  async execute(client, message, args) {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing)
      return sendEmbed(`${client.config.emojis.erroremoji} No music is currently playing [${message.author}]`);

    if (!queue.tracks[0]) {
      return sendEmbed("There is only one song in the queue").catch(console.error);
    };
    if (!args.length) {
      return sendEmbed(`Try: \n\`\`\`yml\n${client.config.app.px}jump <song Number>\n\`\`\``).catch(console.error);
    };
    if (isNaN(args[0])) {
      return sendEmbed(`Try: \n\`\`\`yml\n${client.config.app.px}jump <song Number>\n\`\`\``).catch(console.error);
    };
    if (args[0] > queue.tracks.length) {
      return sendEmbed(`There are only \`${queue.tracks.length}\` in the queue`).catch(console.error);
    };

    try {

      let songIndex = Number(args[0] - 1);
      let position = Number(args[1] - 1);

      let song = queue.tracks[songIndex];
      //removing the song
      let toremove = songIndex - 1
      queue.tracks.splice(0, toremove);
      //Add it to a specific Position
      queue.jump(queue.tracks[0]);
      return sendEmbed(`jumped to [${song.title}](${song.url}) [${message.author}]`);
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