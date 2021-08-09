const db = require("croxydb")
const dc = require("discord.js")

exports.run = async (client, message, args) => {
  
  const tahaembed = new dc.MessageEmbed()
  .setColor('BLACK')
  .setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
  
  let yedekler = await db.get(`y_${message.author.id}`)
  let sj;
  if(!yedekler) {
    sj = "**Yedeğin Bulunmamakta.**"
    } else {
      sj = yedekler.map(x => `**${x.id}**\n${x.adı} (\`${x.tarih}\`)\n`)
      }
  message.channel.send(tahaembed.setDescription(sj))
  }