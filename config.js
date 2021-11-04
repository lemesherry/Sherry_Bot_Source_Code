module.exports = {
    app: {
        px: '+',
        playing: 'with your heart ❤️',
        BOTNAME: 'Sherry 4',
        AVATARURL: 'https://cdn.discordapp.com/attachments/869602929957552159/869603777957740594/sherry-4.gif',
        INVITELINK: 'https://discord.com/api/oauth2/authorize?client_id=850032609543454720&permissions=37088600&scope=bot',
        OWNER: 'Music comes first - Made with heart by Sherry ❤️'
    },
    
    emojis: {
        enabledemoji: "◆",
        disabledemoji: "◇",
        musicemoji: "🎶",
        erroremoji: "❗",
        successemoji: "☑"
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 150,
        discordPlayer: {
            leaveOnEnd: false,
            leaveOnStop: false,
            leaveOnEmpty: false,
            leaveOnEmptyCooldown: 600000,
            autoSelfDeaf: true,
            ytdlOptions: {
                highWaterMark: 24,
                filter: 'audioonly',
                bitrate: 320,
                quality: 'highestaudio',
                // format: "audioonly",
                liveBuffer: 60000,
                dlChunkSize: 1024 * 1024 * 64,
            },
            // initialVolume: 100,
            // bufferingTimeout: 30000
        }
    }
};
