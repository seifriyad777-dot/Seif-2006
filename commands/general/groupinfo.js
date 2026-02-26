/**
 * Group Info Command - عرض معلومات الجروب
 */

module.exports = {
    name: 'groupinfo',
    aliases: ['info', 'ginfo', 'معلومات', 'معلومات_الجروب'],
    category: 'general',
    description: 'عرض معلومات الجروب',
    usage: 'معلومات',
    groupOnly: true,
    
    async execute(sock, msg, args, extra) {
      try {
        const metadata = extra.groupMetadata;
        
        const admins = metadata.participants.filter(
          p => p.admin === 'admin' || p.admin === 'superadmin'
        );

        let text = `╭━━『 📋 معلومات الجروب 』━━╮\n\n`;
        text += `🏷️ الاسم: ${metadata.subject}\n`;
        text += `🆔 المعرف: ${metadata.id}\n`;
        text += `👥 عدد الأعضاء: ${metadata.participants.length}\n`;
        text += `👑 عدد المشرفين: ${admins.length}\n`;
        text += `📝 الوصف: ${metadata.desc || 'لا يوجد وصف'}\n`;
        text += `🔒 الجروب مقفل: ${metadata.restrict ? 'نعم' : 'لا'}\n`;
        text += `📢 وضع الإعلانات فقط: ${metadata.announce ? 'مفعل' : 'غير مفعل'}\n`;
        text += `📅 تاريخ الإنشاء: ${new Date(metadata.creation * 1000).toLocaleDateString('ar-EG')}\n\n`;
        text += `👑 قائمة المشرفين:\n`;
        
        admins.forEach((admin, index) => {
          text += `${index + 1}. @${admin.id.split('@')[0]}\n`;
        });

        text += `\n╰━━━━━━━━━━━━━━━━━━╯`;
        
        await sock.sendMessage(extra.from, {
          text,
          mentions: admins.map(a => a.id)
        }, { quoted: msg });
        
      } catch (error) {
        await extra.reply(`❌ حدث خطأ: ${error.message}`);
      }
    }
};
