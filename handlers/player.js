const DisTube = require("distube")
const config = require("../config.json");
const functions = require("../function")
const { MessageEmbed } = require("discord.js");
const { format } = require("../handlers/functions")
module.exports = (client) => {

  client.distube = new DisTube(client, {
    searchSongs: false,
    emitNewSongOnly: false,
    highWaterMark: 1024*1024*64,
    selfDeaf: true,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
    youtubeCookie: "VISITOR_INFO1_LIVE=b6qp82uXezw; LOGIN_INFO=AFmmF2swRQIhANTrldzls-FGOwD6TQOpb22vUHbC5dccsQXq15VP3Jj_AiAyOpvQWlMDTO8D5WZfcBINTnNOsAX_lNwbgCMx5UvFfw:QUQ3MjNmeDBmWlJWU21TUDRjUkIzMGd4WVhxdzR4SzkyTk1FSVB1aDBzNnVCYTNiQ2V6RUZyWGVTYVFra09McEV5d21HMlVXUjViQUJDZVJ2cm0wTmFiLTczcVd4SldWOGF0Z0xCRk1KQVRoRzJFT1k2RmtIZ0diNmZjUWZ2WFk2SHVpMlFfaERmYzZiNUZ1V3ltUlFHbE1GQXJJU2pVOUVndEM4NWdEcXZZc1pKUEtPQV9Hei1F; HSID=AR5my-7SroDWQRyTT; SSID=A_5LbVinofiLmdXnP; APISID=2hND7uOhiea0e0Wt/AYufcovtcdo38Np6k; SAPISID=1GjeNWiOGgu7_iS2/Ap0D8KMSv7mrw53KX; __Secure-3PAPISID=1GjeNWiOGgu7_iS2/Ap0D8KMSv7mrw53KX; _gcl_au=1.1.689876461.1625415107; NID=218=fviI7LflNsMuGMG64OPzcarzczBBEkZnikzOUDi2loCtZ0f9HpAlRGgfZTiXAhqj7FiUGOzBGNCNe-aweyWRwrDRs0eTLVVZsci2qg9RnjKq0z01i1NfkC3j8hqzqJ5WAAKRmcLTbRSSPu3YOVjd_2vEKEjUHIrmPDUiIiEbWGg; PREF=tz=Asia.Singapore&gl=KR&f6=400&f5=30000; __Secure-1PAPISID=1GjeNWiOGgu7_iS2/Ap0D8KMSv7mrw53KX; __Secure-1PSID=AQjkR6w86KDxNucfzO0KuOknQFIEO2a0YQT9CA7YztsRk3_TlqYM55z_4rMdQkSIMIh2fw.; SID=AQjkR9a9B9XLsDgU6SkcFPk2vtFyTLRNOOOY176VEPgF_yQSFtaTrbfiOSRKWU9aQ8qONg.; __Secure-3PSID=AQjkR9a9B9XLsDgU6SkcFPk2vtFyTLRNOOOY176VEPgF_yQSuj6r3O3Cr_KRq0nzPS9A9A.; YSC=oMoI-SiVsb4; SIDCC=AJi4QfFwifypG63S53ueRRTx85Q16ZS04c7D9MTV-8w5GfoLWcRFMZjSPn_Tgph1XZ0Ksi5aFno; __Secure-3PSIDCC=AJi4QfEWevscKl1R1Sh2qZXUGpiwUUU1gUmpSbysjFVk14sXX2afroSMj_GFzylVvJlwUH0p7l1O",
    youtubeDL: true,
    updateYouTubeDL: true,
    customFilters: {
      "clear": "dynaudnorm=f=200",
      "lowbass": "bass=g=6,dynaudnorm=f=200",
      "bassboost": "bass=g=20,dynaudnorm=f=200",
      "purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
      "8D": "apulsator=hz=0.08",
      "vaporwave": "aresample=48000,asetrate=48000*0.8",
      "nightcore": "aresample=48000,asetrate=48000*1.25",
      "phaser": "aphaser=in_gain=0.4",
      "tremolo": "tremolo",
      "vibrato": "vibrato=f=6.5",
      "reverse": "areverse",
      "treble": "treble=g=5",
      "normalizer": "dynaudnorm=f=200",
      "surrounding": "surround",
      "pulsator": "apulsator=hz=1",
      "subboost": "asubboost",
      "karaoke": "stereotools=mlev=0.03",
      "flanger": "flanger",
      "gate": "agate",
      "haas": "haas",
      "mcompand": "mcompand"
    }

  })

  // Queue status template
  const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

  // DisTube event listeners, more in the documentation page
client.distube
.on("playSong", (message, queue, song) => { 
  queue.connection.voice.setDeaf(true)
  message.channel.send(new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("🎶 Playing Song!")
            .setDescription(`Song: [\`${song.name}\`](${song.url})`)
            .addField("💡 Requested by:", `>>> ${song.user}`, true)
            .addField("⏱ Duration:", `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
            .addField("🌀 Queue:", `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
            .addField("🔊 Volume:", `>>> \`${queue.volume} %\``, true)
            .addField("♾ Loop:", `>>> ${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}`, true)
            .addField("↪️ Autoplay:", `>>> ${queue.autoplay ? "✅" : "❌"}`, true)
            .addField("❔ Download Song:", `>>> [\`Click here\`](${song.streamURL})`, true)
            .addField("❔ Filter:", `>>> \`${queue.filter || "❌"}\``, true)
            .setFooter(client.user.username + " | by: Wonyoungieeeeeee#2004", client.user.displayAvatarURL())
            .setAuthor(message.author.tag, message.member.user.displayAvatarURL({
                dynamic: true
            }))
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
        

      ).then(async msg => {
        let emojiarray = ["⏭", "⏹", "🔉", "🔊", "⬅️", "➡️"];
        for(const emoji of emojiarray)
          await msg.react(emoji)

          var filter = (reaction, user) => emojiarray.includes(reaction.emoji.name) && user.id !== message.client.user.id;


        var collector = await msg.createReactionCollector(filter, {
            time: song.duration > 0 ? song.duration * 1000 : 600000
        });
        collector.on("collect", async (reaction, user) => {
            //return if no queue available
            if (!queue) return;

            //create member out of the user
            const member = reaction.message.guild.member(user);

            //remoe the reaction
            reaction.users.remove(user);

            //if member not connected, return error
            if (!member.voice.channel) return embedbuilder(client, 3000, message, "RANDOM", "`" + message.author.tag + "`" + " You must join a Voice Channel")

            //if member is not same vc as bot return error
            if (member.voice.channel.id !== member.guild.me.voice.channel.id) return embedbuilder(client, 3000, message, "RANDOM", "`" + message.author.tag + "`" + " You must join my Voice Channel")

            //if not a dj return error
            if (check_if_dj(reaction.message, member))
                return embedbuilder(client, 6000, message, "RANDOM", "DJ-ROLE", `❌ You don\'t have permission for this Command! You need to have: ${check_if_dj(message)}`)

            switch (reaction.emoji.id || reaction.emoji.name) {
                case "⏭":
                    client.distube.skip(message);
                    embedbuilder(client, 3000, message, "RANDOM", "SKIPPED!", `Skipped the song`)
                    try {
                        playingMessage.reactions.removeAll();
                    } catch {}

                    try {
                        playingMessage.delete({
                            timeout: client.ws.ping
                        });
                    } catch {}
                    break;

                case "⏹":
                    client.distube.stop(message);
                    try {
                        playingMessage.reactions.removeAll();
                    } catch {}
                    try {
                        playingMessage.delete({
                            timeout: client.ws.ping
                        });
                    } catch {}
                    embedbuilder(client, 3000, message, "RANDOM", "STOPPED!", `Left the channel`)
                    break;

                case "🔉":
                    await client.distube.setVolume(message, Number(queue.volume) - 10);
                    embedbuilder(client, 3000, message, "RANDOM", "Volume!", `Reduced the Volume to \`${queue.volume}\``)
                    break;

                case "🔊":
                    await client.distube.setVolume(message, Number(queue.volume) + 10);
                    embedbuilder(client, 3000, message, "RANDOM", "Volume!", `Raised the Volume to \`${queue.volume}\``)
                    break;

                case "⬅️":
                    let seektime = queue.currentTime - 10000;
                    if (seektime < 0) seektime = 0;
                    await client.distube.seek(message, Number(seektime));

                    embedbuilder(client, 3000, message, "RANDOM", "Seeked!", `Seeked the song for \`-10 seconds\``)
                    break;

                case "➡️":
                    let seektime2 = queue.currentTime + 10000;
                    if (seektime2 >= queue.songs[0].duration * 1000) {
                        seektime2 = queue.songs[0].duration * 1000 - 1;
                    }
                    await client.distube.seek(message, seektime2);

                    embedbuilder(client, 3000, message, "RANDOM", "Seeked!", `Seeked the song for \`+10 seconds\``)
                    break;
                default:
                    break;
            }
        });
        collector.on("end", ()=>{
          try{
            msg.delete()
          }catch{
          }
        })
      })
      }
      )
      .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed()
          .setTitle("Song Added :thumbsup:")
          .setDescription(`**Song Title** 🎵\n\`${song.name}\``)
          .setURL(song.url)
          .setColor("RANDOM")
          .addField("Songs in Queue 🎵", `\`${queue.songs.length} songs! | ${format(queue.duration*1000)}\``, true)
          .addField("Duration ⌛", `\`${song.formattedDuration}\``, true)
          .addField("Requested By 🔥", `\`${song.user.tag}\``, true)
          .setThumbnail(song.thumbnail)
          .setFooter(client.user.username, client.user.displayAvatarURL())
        )
      )
      .on("playList", (message, queue, playlist, song) => {
        message.channel.send(new MessageEmbed()
            .setTitle("Playing Playlist :notes:")
            .setDescription(`**Playlist Name** 🎵\n\`${playlist.name}\` with \`${playlist.songs.length}\` songs!`)
            .setURL(playlist.url)
            .setColor("RANDOM")
            .addField("Current Track 🎵", `\`${song.name}\``, true)
            .addField("Duration ⌛", `\`${playlist.formattedDuration}\``, true)
            .addField("Volume 🔊", `\`${queue.volume}%\``, true)
            .addField("Requested By 🔥", `\`${song.user.tag}\``,true)
            .addField("Songs in Queue 🎵", `\`${queue.songs.length} songs!\` | \`${format(queue.duration*1000)}\``, true)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(client.user.username, client.user.displayAvatarURL())

        ).then(async msg => {
        let emojiarray = ["⏭","⏹","⏯","⏪","⏩","🔁","🔉","🔊"];
        for(const emoji of emojiarray)
          await msg.react(emoji)

          var filter = (reaction, user) => emojiarray.includes(reaction.emoji.name) && user.id !== message.client.user.id;


        var collector = await msg.createReactionCollector(filter, { time: song.duration > 0 ? song.duration * 1000 : 180000 });
        collector.on("collect", async (reaction, user) => {
          if (!queue) return;
          const member = reaction.message.guild.member(user);
          reaction.users.remove(user);
          if(!member.voice.channel)
            return message.channel.send(new MessageEmbed()
              .setColor("RANDOM")
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTitle(`❌ ERROR`)
              .setDescription(`❌ Please join in a Voice Channel!`)
            )
          if(member.voice.channel.id !== member.guild.voice.channel.id)
            return message.channel.send(new MessageEmbed()
              .setColor("RANDOM")
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTitle(`❌ ERROR`)
              .setDescription(`❌ Please join my Voice Channel!\nChannelname: \`${member.guild.voice.channel.name}\``)
            )

            switch(reaction.emoji.name){
              case "⏭":
                reaction.message.channel.send(new MessageEmbed()
                  .setColor("RANDOM")
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTitle(`✅ Music Skipped`)
                  .setDescription(`⏭ Skipped the current music!`)
                )
                client.distube.skip(reaction.message)
              break;
              case "⏹":
                reaction.message.channel.send(new MessageEmbed()
                  .setColor("RANDOM")
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTitle(`✅ Music Stopped`)
                  .setDescription(`⏹ Stopped playing and left the channel!`)
                )
                client.distube.stop(reaction.message)
              break;
              case "⏯":
                if(client.distube.isPaused(message)){
                  client.distube.resume(message);
                  client.distube.pause(message);
                  client.distube.resume(message);
                  return message.channel.send(new MessageEmbed()
                    .setColor("RANDOM")
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setTitle("✅ Music Resumed")
                    .setDescription("▶ Resumed the current music!")
                  )
                }
                message.channel.send(new MessageEmbed()
                  .setColor("RANDOM")
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTitle("✅ Music Paused")
                  .setDescription("⏸ Paused the current music!")
                )
                client.distube.pause(message);

              break;
              case "⏪":
                let seektime = queue.currentTime - 15 * 1000;
                if(seektime < 0)
                  seektime = 0;
                if(seektime >= queue.songs[0].duration * 1000 - queue.currentTime)
                  seektime = 0;
                client.distube.seek(message, seektime);
                message.channel.send(new MessageEmbed()
                  .setColor("RANDOM")
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTitle(`✅ Music Rewinded`)
                  .setDescription(`⏪ Rewinded for \`15 Seconds\` to: ${format(seektime)}`)
                )
              break;
              case "⏩":
                let seektime2 = queue.currentTime + 15 * 1000;
                if(seektime2 < 0)
                  seektime2 = queue.songs[0].duration * 1000;
                if(seektime2 >= queue.songs[0].duration * 1000)
                  seektime2 = queue.songs[0].duration * 1000 - 1000;
                client.distube.seek(message, seektime2);
                message.channel.send(new MessageEmbed()
                  .setColor("RANDOM")
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTitle(`✅ Music Forwarded`)
                  .setDescription(`⏩ Forwarded for \`15 Seconds\` to: ${format(seektime2)}`)
                )
              break;
              case "🔉":
                client.distube.setVolume(message, queue.volume - 10);
                if(queue.volume < 10) client.distube.setVolume(message, 0);
                return message.channel.send(new MessageEmbed()
                  .setColor("RANDOM")
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTitle('✅ Changed the volume')
                  .setDescription(`🔉 Reduced the Volume for \`10 %\` to: \`${queue.volume}%\``)
                );
              break;
              case "🔊":
                client.distube.setVolume(message, queue.volume + 10);
                if(queue.volume > 150) client.distube.setVolume(message, 150);
                return message.channel.send(new MessageEmbed()
                  .setColor("RANDOM")
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTitle('✅ Changed the volume')
                  .setDescription(`🔉 Reduced the Volume for \`10 %\` to: \`${queue.volume}%\``)
                );
              break;
            }
        })
        collector.on("end", ()=>{
          try{
            msg.delete()
          }catch{
          }
        })
      })
      }
      )  
      .on("addList", (message, queue, playlist) => message.channel.send(new MessageEmbed()
            .setTitle("Added Playlist :thumbsup:")
            .setDescription(`**Playlist Name** 🎵\n\`${playlist.name}\` with \`${playlist.songs.length}\` songs!`)
            .setURL(playlist.url)
            .setColor("RANDOM")
            .addField("Duration", `\`${playlist.formattedDuration}\``, true)
            .addField("Songs in Queue 🎵", `\`${queue.songs.length}\` | \`${format(queue.duration*1000)}\``, true)
            .addField("Requested By 🔥", `\`${message.author.tag}\``, true)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        )
      )
      .on("searchResult", (message, result) =>
          message.channel.send(new MessageEmbed()
                  .setTitle("**Choose an option from below**")
                  .setURL(song.url)
                  .setColor("RANDOM")
                  .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
                  .setFooter(client.user.username, client.user.displayAvatarURL())
          )
      )
      .on("searchCancel", (message) => message.channel.send(new MessageEmbed()
          .setColor("RANDOM")
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTitle(`❌ ERROR`)
          .setDescription('❌ Search Cancelled')
        )
      )
      .on("error", (message, e) => {
          console.log(String(e.stack).bgRed)
          message.channel.send(new MessageEmbed()
              .setColor("RANDOM")
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTitle(`❌ ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.stack}\`\`\``)
          )
      })
      .on("initQueue", queue => {
          queue.autoplay = false;
          queue.volume = 75;
          queue.filter = "lowbass";
      }
    )

}
