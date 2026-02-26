/**
 * List Command
 * عرض جميع الأوامر مع الشرح
 */

const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');
const { sendButtons } = require('gifted-btns');

module.exports = {
  name: 'list',
  aliases: ['قائمة', 'الأوامر'],
  description: 'عرض جميع الأوامر مع الوصف',
  usage: 'قائمة',
  category: 'general',
  
  async execute(sock, msg, args, extra) {
    try {
      const commands = loadCommands();
      const categories = {};
      
      commands.forEach((cmd, name) => {
        if (cmd.name === name) {
          const category = (cmd.category || 'other').toLowerCase();
          if (!categories[category]) {
            categories[category] = [];
          }
          categories[category].push({
            label: cmd.description || '',
            names: [cmd.name].concat(cmd.aliases || []),
          });
        }
      });
      
      let menu = `📜 *${config.botName} - قائمة الأوامر*\n`;
      menu += `━━━━━━━━━━━━━━━━━━\n\n`;
      
      const orderedCats = Object.keys(categories).sort();
      
      for (const cat of orderedCats) {
        menu += `📂 *${cat}*\n`;
        for (const entry of categories[cat]) {
          const cmdList = entry.names.join(' ، ');
          const label = entry.label || '';
          menu += label 
            ? `• ${cmdList} - ${label}\n` 
            : `• ${cmdList}\n`;
        }
        menu += '\n';
      }
      
      menu = menu.trimEnd();
      
      await sendButtons(sock, extra.from, {
        title: '',
        text: menu,
        footer: `> تم التشغيل بواسطة ${config.botName}`,
        buttons: [
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: '📺 يوتيوب',
              url: config.social?.youtube || 'http://youtube.com/@mr_unique_hacker'
            })
          },
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: '💻 مستودع البوت',
              url: config.social?.github || 'https://github.com/mruniquehacker'
            })
          },
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: '👑 تواصل مع المالك',
              url: 'https://wa.me/201061891947'
            })
          }
        ]
      }, { quoted: msg });
      
    } catch (err) {
      console.error('list.js error:', err);
      await extra.reply('❌ حدث خطأ أثناء تحميل قائمة الأوامر.');
    }
  }
};
