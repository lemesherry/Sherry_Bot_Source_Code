const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

client.commands = new Collection();

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`๐ฑโ๐ดโ๐ฆโ๐ฉโ๐ฎโ๐ณโ๐ฌโ  ๐ชโ๐ปโ๐ชโ๐ณโ๐นโ๐ธโ...`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

console.log(`๐ฑโ๐ดโ๐ฆโ๐ฉโ๐ฎโ๐ณโ๐ฌโ  ๐จโ๐ดโ๐ฒโ๐ฒโ๐ฆโ๐ณโ๐ฉโ๐ธโ...`);

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`../commands/${dirs}/${file}`);
        console.log(`-> Loaded command ${command.name.toLowerCase()}`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
    };
});