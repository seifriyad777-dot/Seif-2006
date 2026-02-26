/**
 * Uptime Command - عرض مدة تشغيل البوت
 */

const config = require('../../config');

function formatUptime(seconds) {
  if (seconds <= 0) {
    return '0 ثانية';
  }
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const parts = [];
  
  if (days > 0) {
    parts.push(`${days} يوم`);
  }
  if (hours > 0) {
    parts.push(`${hours} ساعة`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} دقيقة`);
  }
  if (secs > 0 || parts.length === 0) {
    parts.push(`${secs} ثانية`);
  }
  
  return parts.join(' ، ');
}

module.exports = {
  name: 'uptime',
  aliases: ['runtime', 'botuptime', 'alive', 'المدة', 'تشغيل'],
  category: 'general',
  description: 'عرض مدة تشغيل البوت',
  usage: 'المدة',
  
  async execute(sock, msg, args, extra) {
    try {
      const uptimeSeconds = process.uptime();
      const uptime = formatUptime(uptimeSeconds);
      
      const botName = config.botName || 'البوت';
      const botVersion = 'الإصدار 1.0.1';
      
      let message = `╭━━『 *مدة تشغيل البوت* 』━━╮\n\n`;
      message += `🤖 اسم البوت: ${botName}\n`;
      message += `🧬 ${botVersion}\n`;
      message += `⏱️ مدة التشغيل: ${uptime}\n`;
      message += `\n╰━━━━━━━━━━━━━━━╯`;
      
      await extra.reply(message);
      
    } catch (error) {
      console.error('Error in uptime command:', error);
      await extra.reply('❌ حدث خطأ أثناء جلب مدة التشغيل.');
    }
  }
};
