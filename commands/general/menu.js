/**
 * Menu Command - Display all available commands
 */

const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');

module.exports = {
  name: 'menu',
  aliases: ['help', 'commands'],
  category: 'general',
  description: 'عرض جميع الأوامر',
  usage: 'menu',
  
  async execute(sock, msg, args, extra) {
    try {
      const commands = loadCommands();
      const categories = {};
      
      commands.forEach((cmd, name) => {
        if (cmd.name === name) {
          if (!categories[cmd.category]) {
            categories[cmd.category] = [];
          }
          categories[cmd.category].push(cmd);
        }
      });
      
      const ownerNames = Array.isArray(config.ownerName) ? config.ownerName : [config.ownerName];
      const displayOwner = ownerNames[0] || config.ownerName || 'المالك';

      let menuText = `╭━━『 *${config.botName}* 』━━╮\n\n`;
      menuText += `👋 أهلاً يا @${extra.sender.split('@')[0]} 👑\n\n`;
      menuText += `📦 عدد الأوامر: ${commands.size}\n`;
      menuText += `👑 المطور: ${displayOwner}\n\n`;

      const section = (title, emoji, cmds) => {
        if (!cmds) return;
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ ${emoji} ${title}\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
cmds.forEach(cmd => {
  const arabicAlias = cmd.aliases?.find(a => /[\u0600-\u06FF]/.test(a));
  menuText += `│ ➜ ${arabicAlias || cmd.name}\n`;
});
      };

      section('📌 الأوامر العامة', '🧭', categories.general);
      section('أوامر الذكاء الاصطناعي', '🤖', categories.ai);
      section('أوامر الجروب', '👥', categories.group);
      section('أوامر الأدمن', '🛡️', categories.admin);
      section('أوامر المالك', '👑', categories.owner);
      section('أوامر الميديا', '🎞️', categories.media);
      section('أوامر ترفيه', '🎭', categories.fun);
      section('أوامر الأدوات', '🔧', categories.utility);
      section('أوامر الأنمي', '👾', categories.anime);
      section('أوامر النصوص', '🖋️', categories.textmaker);

      menuText += `╰━━━━━━━━━━━━━━━━━\n\n`;
      menuText += `💡 اكتب اسم الأمر مباشرة للتنفيذ\n`;
      menuText += `🚀 إصدار البوت: 1.0.0\n`;

      await sock.sendMessage(extra.from, {
        text: menuText,
        mentions: [extra.sender]
      }, { quoted: msg });

    } catch (error) {
      await extra.reply(`❌ حدث خطأ: ${error.message}`);
    }
  }
};
