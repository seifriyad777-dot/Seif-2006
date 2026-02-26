/**
 * QR Code Generator Command - إنشاء رمز QR
 */

const qrcode = require('qrcode');

module.exports = {
  name: 'qr',
  aliases: ['qrcode', 'رمز', 'كيوآر'],
  category: 'general',
  description: 'إنشاء رمز QR من نص أو رابط',
  usage: 'رمز <النص>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('❌ طريقة الاستخدام:\nرمز <النص>\n\nمثال:\nرمز https://google.com');
      }
      
      const text = args.join(' ');
      
      const qrBuffer = await qrcode.toBuffer(text, {
        type: 'png',
        width: 500,
        margin: 2
      });
      
      await sock.sendMessage(extra.from, {
        image: qrBuffer,
        caption: `✅ تم إنشاء رمز QR بنجاح\n\n📝 المحتوى:\n${text}`
      }, { quoted: msg });
      
    } catch (error) {
      await extra.reply(`❌ حدث خطأ: ${error.message}`);
    }
  }
};
