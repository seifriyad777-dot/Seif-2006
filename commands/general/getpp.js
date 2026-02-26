const axios = require('axios');

module.exports = {
  name: 'getpp',
  aliases: ['gp', 'getpic', 'صورته', 'صورة'],
  category: 'general',
  description: 'جلب الصورة الشخصية لأي عضو',
  usage: 'صورته (بالرد أو المنشن)',
  
  async execute(sock, msg, args, extra) {
    try {
      let targetUser = null;
      
      const quotedMessage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (quotedMessage) {
        targetUser = msg.message.extendedTextMessage.contextInfo.participant;
      } else {
        const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        if (mentionedJid && mentionedJid.length > 0) {
          targetUser = mentionedJid[0];
        } else {
          targetUser = extra.sender;
        }
      }
      
      if (!targetUser) {
        return extra.reply('❌ لم أستطع تحديد المستخدم. قم بالرد على رسالة أو عمل منشن للشخص.');
      }
      
      try {
        const ppUrl = await sock.profilePictureUrl(targetUser, 'image');
        
        if (!ppUrl) {
          return extra.reply('❌ لا توجد صورة شخصية لهذا المستخدم.');
        }
        
        const response = await axios.get(ppUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        
        await sock.sendMessage(extra.from, { 
          image: buffer,
          caption: `👤 الصورة الشخصية لـ @${targetUser.split('@')[0]}`,
          mentions: [targetUser]
        }, { quoted: msg });
        
      } catch (profileError) {
        return extra.reply('❌ لا يمكن عرض الصورة الشخصية (قد تكون خاصة أو غير متاحة).');
      }
      
    } catch (error) {
      extra.reply('❌ لا يمكن عرض الصورة الشخصية لهذا المستخدم.');
    }
  }
};
