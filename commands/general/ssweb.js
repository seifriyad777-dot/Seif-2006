/**
 * SSWeb - تصوير موقع
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'ssweb',
  aliases: ['screenshot', 'ss', 'webss', 'موقع', 'تصوير'],
  category: 'general',
  description: 'تصوير صفحة موقع وإرسال لقطة شاشة',
  usage: 'موقع <الرابط>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('❌ اكتب رابط الموقع بعد الأمر.\n\nمثال:\nموقع https://github.com');
      }
      
      const url = args.join(' ');
      
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return extra.reply('❌ يجب أن يبدأ الرابط بـ http:// أو https://');
      }
      
      await sock.sendMessage(extra.from, {
        react: { text: '📥', key: msg.key }
      });
      
      const screenshotBuffer = await APIs.screenshotWebsite(url);
      
      await sock.sendMessage(extra.from, {
        image: screenshotBuffer,
      }, { quoted: msg });
      
    } catch (error) {
      console.error('SSWeb command error:', error);
      await extra.reply('❌ فشل تصوير الموقع، تأكد أن الرابط صحيح.');
    }
  }
};
