const db = require("croxydb")
const dc = require("discord.js")
const backup = require("discord-backup")

exports.run = async (client, message, args) => {
  
  const tahaembed = new dc.MessageEmbed()
  .setColor('BLACK')
  .setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
  
  
  let backupID = args[0]
  let a = db.get(`yedek_${backupID}`)
  if(a === message.author.id) {
  message.channel.send(tahaembed.setDescription(`:white_check_mark: **Yedek Başarıyla Silindi.** :white_check_mark:`).setThumbnail(message.author.avatarURL({ dynamic: true })))
  backup.remove(backupID)
  db.delete(`yedek_${backupID}`)
  db.delete(`toplam_${message.author.id}`, 1)
  db.set(`y_${message.author.id}`, db.get(`y_${message.author.id}`).filter(z => z.id !== backupID))
  } else {
    message.channel.send(tahaembed.setDescription(`**Böyle Bir Yedek Bulunamadı !**`))
    }
  }