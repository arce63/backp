const backup = require('discord-backup');
const config = require("../config.json")
const prex = require("discord.js")
const db = require("croxydb")
exports.run = async (client, message, args) => {
    
  const tahaembed = new prex.MessageEmbed()
  .setColor('BLACK')
  .setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))

    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: Bu Komutu Kullanmak İçin `Yönetici` Yetkisine Sahip Olmalısın!');
    }

    const backupID = args.join(' ');
    let kontrol = db.get(`yedek_${backupID}`)
    if(kontrol !== message.author.id) return message.channel.send(tahaembed.setDescription(`:x: **Böyle Bir Yedeğe Sahip Değilsin.** :x:`))
    backup.fetch(backupID).then(() => {
        let uyarı = tahaembed.setDescription(`**Bütün Kanallar, Roller Ve Ayarlar Sıfırlanacak,\n\nDevam Etmek İçin** **\`evet\`** **İptal Etmek İçin** **\`hayır\`** **Yazmanız Yeterli.**`)
        message.channel.send(uyarı)
        
        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['evet', 'hayır'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === 'evet';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send(tahaembed.setDescription(`**Yedek Başarıyla Yüklendi.**`));
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send(tahaembed.setDescription(`:x: **\`${backupID}\`** **IDli Yedek Bulunamıyor!** :x:`));
                    else
                        return message.author.send(tahaembed.setDescription(`:x: **Bir Hata Oluştu, Lütfen Tekrar Deneyin.** :x:`)) ? err : JSON.stringify(err);
            
                });

            } else {
                return message.channel.send(tahaembed.setDescription(`:x: **İşlem İptal Edildi.** :x:`));
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(tahaembed.setDescription(`**Komut Zaman Aşımına Uğradı, Lütfen Tekrar Deneyin.**`));
        })

    }).catch(() => {
        return message.channel.send(tahaembed.setDescription(`:x: **\`${backupID}\`** **IDli Yedek Bulunamıyor!** :x:`));
    });

};
