/**
 * Ping Command - فحص سرعة استجابة البوت
 */

module.exports = {
    name: 'ping',
    aliases: ['p', 'فحص'],
    category: 'general',
    description: 'فحص سرعة استجابة البوت',
    usage: 'فحص',
    
    async execute(sock, msg, args, extra) {
      try {
        const start = Date.now();
        const sent = await extra.reply('⏳ جاري فحص السرعة...');
        const end = Date.now();
        
        const responseTime = end - start;
        
        await sock.sendMessage(extra.from, {
          text: `🏓 *تم الفحص بنجاح!*\n⚡ سرعة الاستجابة: ${responseTime} مللي ثانية`,
          edit: sent.key
        });
        
      } catch (error) {
        await extra.reply(`❌ حدث خطأ: ${error.message}`);
      }
    }
};
