const dc = require("discord.js")
const ayarlar = require('../config.json')
const prefix = ayarlar.prefix

exports.run = async (client, message, args) => {
  const uyeler = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
const sunucular = client.guilds.cache.size
const kanallar = client.channels.cache.size
    let saniye = Math.floor(message.client.uptime / 1000);
    let dakika = Math.floor(saniye / 60);
    let saat = Math.floor(dakika / 60);
    let gün = Math.floor(saat / 24);
    saniye %= 60;
    dakika %= 60;
    saat %= 24;
const komutlar = client.commands.size
  let embed = new dc.MessageEmbed()
  .setDescription(`**———————————————————————————————**
  **» Botun Adı :** \`${client.user.tag}\`
  **» Botun IDsi :** \`${client.user.id}\`
 
  
  **» Bot Sürümü :** \`0.8.3 Beta\`
  **» Gecikme Sürem :** \`${client.ws.ping}MS\`
  **» Aktiflik :** \`${gün} Gün, ${saat} Saat, ${dakika} Dakika, ${saniye} Saniyedir Çalışmaktayım.\`
  **———————————————————————————————**
  **» Botun Davet Linki :**\n**[[8 = Yönetici Permli Davet Linkim]](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) || [[0 = Permsiz Davet Linkim]](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=0)**`)
  .setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true} ))
  .setThumbnail(message.guild.iconURL())
  .setColor("BLACK")
  
  message.channel.send(embed)
  }