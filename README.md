# Sherry Music Bot For Discord

## <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="40" height="40" /> Hello! there its Sherry here.


## ABOUT THE BOT:

### A complete music bot code for discord using Discord.js latest version v13.

### Configuration:

 > * Change the `xyz` with your discord bot token in `.env` file.
#### And change the `config.js` file if you want to:
```yml
module.exports = {
   app: {
        px: '+', // prefix of your bot
        playing: 'with your heart ❤️', // rich presence activity
        BOTNAME: 'Sherry', // your bot name
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
```
  
### Bot Commands:
  ##### Music:
  > * Play
  > * Stop
  > * Pause
  > * Resume
  > * Join
  > * Disconnect
  > * Jump
  > * Back
  > * Clear
  > * Filter
  > * Loop
  > * Move
  > * Nowplaying
  > * Queue
  > * Remove
  > * Save
  > * Seek
  > * Shuffle
  > * Skip
  > * Volume
  > * Lyrics
  ##### Info:
  > * Filterlist
  > * Help
  > * Invite
  > * Ping
  ##### Admin:
  > * Announcement
  > * Delete

#### 🧾 You must install:
 > FFmpeg to process audio, Node JS at least v16 and Code editor of course ^_^

#### You can find my Projects on my
<a href= "https://www.github.com/lemesherry"> <img src="https://raw.githubusercontent.com/ZeroDiscord/ZeroDiscord/main/assets/icons/other/github-solid.svg" width="20" height="20" /> [GitHub Profile](https://www.github.com/lemesherry)

#### Places you can find me:
<a href= "mailto: sghoto7@gmial.com"> <img src="https://www.freepnglogos.com/uploads/logo-gmail-png/logo-gmail-png-gmail-icon-download-png-and-vector-1.png" width="27" height="27" /> <a href= "https://discord.com/users/584534092901646346"> <img src="https://github.com/ZeroDiscord/ZeroDiscord/raw/main/assets/icons/other/discord-solid.svg" width="25" height="25" />  <a href= "https://www.linkedin.com/in/lemesherry"> <img src="https://pngimg.com/uploads/linkedIn/linkedIn_PNG1.png" width="25" height="25" />  <a href= "https://www.instagram.com/leme_sherry"> <img src="https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-svg-vector-for-print.svg" width="25" height="25" /> <a href= "https://www.pinterest.com/leme_sherry"> <img src="https://user-images.githubusercontent.com/84338798/140302859-0746a63f-9341-4c6e-9b65-f2db12696674.png" width="25" height="25" /> <a href= "https://stackoverflow.com/users/16383056/sherry"> <img src="https://cdn.iconscout.com/icon/free/png-256/stackoverflow-2752065-2284882.png" width="25" height="25" /> <a href= "https://www.github.com/lemesherry"> <img src="https://raw.githubusercontent.com/ZeroDiscord/ZeroDiscord/main/assets/icons/other/github-solid.svg" width="25" height="25" />

#### Made with ❤️ by Sherry. 
#### Please do not withdraw the license and keep the credits on this project.
#### To have full access to the project and to be able to withdraw the credits a small donation is accepted.
