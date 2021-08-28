const Discord = require('discord.js')

const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages

const { token , prefix } = require('./config.json')

const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, Distube Event Handler ...
["command", "events", "player"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
  

client.on('message', async message => {

    if(!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "verify") {
        if (message.channel.name.endsWith("verification")) {
            let firstVerifyEmbed = new Discord.MessageEmbed()
                .setThumbnail(message.guild.iconURL({
                    dynamic: true
                }))
                .setTitle(`Welcome to ${message.guild.name}!`)
                .setColor("GREEN")
                .setDescription(`Hello ${message.author}! This server is protected by ${message.client.user.username}. Inorder to verify yourself to the server, please type in the CAPTCHA sent to you below. You have 5 minutes to do so, if not you will be kicked. `)
                .addField("Password:", `\`chillzone\``)
            message.channel.send(firstVerifyEmbed).then(() => {
                const filter = m => message.author.id === m.author.id;

                message.channel.awaitMessages(filter, {
                        time: 5 * 60000,
                        max: 1,
                        errors: ['time']
                    })
                    .then(async messages => {
                        if (messages.first().content.toLowerCase() === 'chillzone') {
                            message.channel.bulkDelete(3)
                            let verificationEmbed = new Discord.MessageEmbed()
                                .setAuthor(message.author.username, message.author.avatarURL({
                                    dynamic: true
                                }))
                                .setColor("GREEN")
                                .setDescription(`:tada: **You have been verified to: \`${message.guild.name}\`!**`)
                                .setFooter(message.client.user.username, message.client.user.avatarURL())
                            const role = message.guild.roles.cache.find(role => role.id === '877257446186446908');
                            message.member.roles.add(role).then(message.member.roles.remove("877251613859934221"));
                            await message.channel.send(verificationEmbed).then(m => m.delete({
                                timeout: 3000
                            }))
                            console.log(`${message.author.tag} has been verified!`)
                        }

                    })
                    .catch(async () => {
                        message.member.kick().catch(error => {
                            console.log(`There was an error in kicking ${message.author.tag}! \n ${error}`)
                            return
                        })
                        let retryEmbed = new Discord.MessageEmbed()
                            .setAuthor(message.author.username, message.author.avatarURL())
                            .setThumbnail(message.guild.iconURL({
                                dynamic: true
                            }))
                            .setTitle("YOU HAVE FAILED THE VERIFICATION")
                            .setColor("GREEN")
                            .setDescription(`You have failed the verification in \`${message.guild.name}\`! If you want to try again, please click [here](https://discord.gg/9WD2NEVzUM) to rejoin!`)
                            .setFooter(message.client.user.username, message.client.user.avatarURL())
                        await message.author.send(retryEmbed)
                    });
            });
        }
    }
        
        message.delete()
    })

client.on('guildMemberAdd', member => {
    const newUserRole = member.guild.roles.cache.find(role => role.name === "[❌] Not Verified");
    member.roles.add(newUserRole);

    const welcomeEmbed = new Discord.MessageEmbed()

    welcomeEmbed.setAuthor(member.user.tag, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
    welcomeEmbed.setTitle(`**Welcome to ${message.guild.name}**`)
    welcomeEmbed.setColor('RANDOM')
    welcomeEmbed.setImage('https://c.tenor.com/tswpKjAJDnsAAAAC/chillzone.gif')
    welcomeEmbed.setThumbnail('https://c.tenor.com/9Tza2WCNQogAAAAC/chill-zone.gif')
    welcomeEmbed.setDescription(`Welcome to the Server ${member.user} Don't forget to read the <#877267933938741298> and grab some <#877267889466531881>!
    
    Enjoy your stay!`)

    welcomeEmbed.setFooter(`Thank you for joining! ,  You are the ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}th member`)
    member.guild.channels.cache.find(i => i.name === '「🍀」main').send(welcomeEmbed)
})
client.login(token)