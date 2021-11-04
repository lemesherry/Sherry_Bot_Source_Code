const { MessageEmbed } = require('discord.js');

// ANTI CRASH:
module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
        console.log(' [antiCrash] :: Unhandled Rejection/Catch');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch');
        console.log(err, origin);
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [antiCrash] :: Multiple Resolves');
        //console.log(type, promise, reason);
    });
};

// Discord player events:
player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    queue.metadata.send({ embeds: [new MessageEmbed().setColor('BLACK').setDescription(`🎶 **Now Playing** \n[${track.title}](${track.url}) [${track.requestedBy}]`)] });
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send({ embeds: [new MessageEmbed().setColor('BLACK').setDescription(`**Queued**: \n[${track.title}](${track.url}) [${track.requestedBy}]`)] });
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send({ embeds: [new MessageEmbed().setColor('BLACK').setDescription('I was manually disconnected from the voice channel, clearing queue...')] });
});

player.on('channelEmpty', (queue) => {
    queue.destroy(true);
    queue.metadata.send({ embeds: [new MessageEmbed().setColor('BLACK').setDescription('Nobody is in the voice channel for a very long time\ndeleting current queue and leaving the voice channel 😪')] });
});

player.on('queueEnd', (queue) => {
    queue.metadata.send({ embeds: [new MessageEmbed().setColor('BLACK').setAuthor('Queue Ended')] });
});

player.on('tracksAdd', (queue, track) => {
    queue.metadata.send({ embeds: [new MessageEmbed().setColor('BLACK').setDescription(`**Playlist added to the queue** 🎧`)] });
});

player.on('connectionError', (queue) => {
    queue.metadata.send({ embeds: [new MessageEmbed().setColor('RED').setDescription('**Error connecting.  ❌**')] });
});