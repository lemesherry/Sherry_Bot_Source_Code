module.exports = async (client) => {
    console.log(`ʟᴏɢɢᴇᴅ ᴛᴏ ᴛʜᴇ ᴄʟɪᴇɴᴛ ${client.user.username}\n-> ʀᴇᴀᴅʏ ᴏɴ ${client.guilds.cache.size} sᴇʀᴠᴇʀs ғᴏʀ ᴀ ᴛᴏᴛᴀʟ ᴏғ ${client.users.cache.size} ᴜsᴇʀs`);


    client.user.setActivity(`${client.config.app.px}help & ${client.config.app.px}play`, { type: 'LISTENING' });
};