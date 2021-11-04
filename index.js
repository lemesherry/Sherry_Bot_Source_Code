require('dotenv').config();
const { Player } = require('discord-player');
const { Client, Intents, Activity } = require('discord.js');

global.client = new Client({
    shards: "auto",
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    presence: {
        // activity: {
        //   name: `==help & ==play`,
        //   url: `https://discord.com/oauth2/authorize?client_id=845208558736113684&permissions=37088600&scope=bot`,
        //   type: "LISTENING",
        // },
        status: "dnd"
    },
    disableMentions: 'everyone',
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

client.login(process.env.DToken);