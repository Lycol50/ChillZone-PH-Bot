const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const functions = require("../../function")
const { getData, getTracks, getPreview } = require("spotify-url-info")
module.exports = {
    name: "play",
    category: ":notes: Music",
    aliases: ["p", "playsong", "playtrack"],
    cooldown: 4,
    usage: "play <URL / TITLE>",
    description: "Plays a song from youtube",
    run: async (client, message, args, cmduser, text, prefix, stage) => {
    try{
      const { channel } = message.member.voice;
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor('RANDOM')
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTitle(`:x: ERROR | Please join a Channel first`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor('RANDOM')
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTitle(`:x: ERROR | Please join **my** Channel first`)
          .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
        );
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor('RANDOM')
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTitle(`:x: ERROR | You didn't provided a Searchterm`)
          .setDescription(`Usage: \`${prefix}play <URL / TITLE>\``)
        );
        if(!message.guild.me.voice.channel) {
        message.channel.send(new MessageEmbed()
        .setTitle(`👍 **Joined** \`${message.member.voice.channel.name}\``)
        .setDescription(`**Commands bound in** <#${message.channel.id}>`)
        .setColor('RANDOM')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        )
}
    if(message.content.includes('youtu')) {
      message.channel.send(new MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.user.username,client.user.displayAvatarURL())
        .setTitle("<a:loading:881046373250768916> Loading.. | Searching Song :mag_right:")
        .setDescription(`<:youtube:881123490701406228> **Searching** :mag_right: \`${text}\``)
      )
      } else if(message.content.includes('open.spotify')) {
        message.channel.send(new MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.user.username,client.user.displayAvatarURL())
        .setTitle("<a:loading:881046373250768916> Loading.. | Searching Song :mag_right:")
        .setDescription(`<:spotify:881122726914453524> **Searching** :mag_right: \`${text}\``))
      } else {
        message.channel.send(new MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.user.username,client.user.displayAvatarURL())
        .setTitle("<a:loading:881046373250768916> Loading.. | Searching Song :mag_right:")
        .setDescription(`<:youtube:881123490701406228> **Searching** :mag_right: \`${text}\``))
      }
      if (args.join(" ").toLowerCase().includes('open.spotify') && args.join(" ").toLowerCase().includes('track')) {
      //get data
      let info = await getPreview(args.join(" "));
      //play track
      return client.distube.play(message, info.artist + " " + info.title);
    }
        client.distube.play(message, text);
      
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTitle(`:x: ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}