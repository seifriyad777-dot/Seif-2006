/**
 * حماية من منشن الجروبات - تشغيل / إيقاف / تحديد الإجراء
 */

const database = require('../../database');

module.exports = {
  name: 'antigroupmention',
  aliases: ['agm', 'حماية منشن'],
  showInMenu: 'حماية منشن',
  category: 'admin',
  description: 'تفعيل أو ضبط حماية من منشن الجروبات',
  usage: 'حماية منشن <تشغيل/ايقاف/تعيين/حالة>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {

      // 🔒 حماية داخلية إضافية (حتى لو الهاندلر فيه مشكلة)
      if (!extra.isAdmin && !extra.isOwner) {
        return extra.reply('🚫 الأمر ده للمشرفين فقط');
      }

      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? 'مفعلة ✅' : 'متوقفة ❌';
        const action = settings.antigroupmentionAction === 'kick' ? 'طرد' : 'حذف';

        return extra.reply(
          `📌 *حالة حماية منشن الجروبات*\n\n` +
          `الحالة: *${status}*\n` +
          `الإجراء: *${action}*\n\n` +
          `الاستخدام:\n` +
          `  حماية منشن تشغيل\n` +
          `  حماية منشن ايقاف\n` +
          `  حماية منشن تعيين حذف\n` +
          `  حماية منشن تعيين طرد\n` +
          `  حماية منشن حالة`
        );
      }
      
      const opt = args[0].toLowerCase();

      // تشغيل
      if (opt === 'تشغيل') {
        if (database.getGroupSettings(extra.from).antigroupmention) {
          return extra.reply('⚠️ الحماية مفعلة بالفعل');
        }

        database.updateGroupSettings(extra.from, { antigroupmention: true });
        return extra.reply('✅ تم تفعيل حماية منشن الجروبات');
      }

      // ايقاف
      if (opt === 'ايقاف') {
        database.updateGroupSettings(extra.from, { antigroupmention: false });
        return extra.reply('❌ تم إيقاف حماية منشن الجروبات');
      }

      // تعيين الإجراء
      if (opt === 'تعيين') {
        if (!args[1]) {
          return extra.reply('⚠️ اختر الإجراء: حذف أو طرد');
        }

        let action = args[1];

        if (action === 'حذف') action = 'delete';
        else if (action === 'طرد') action = 'kick';
        else return extra.reply('❌ اختيار غير صالح. استخدم حذف أو طرد فقط.');

        database.updateGroupSettings(extra.from, { 
          antigroupmentionAction: action,
          antigroupmention: true
        });

        return extra.reply(
          `✅ تم تعيين الإجراء إلى ${action === 'kick' ? 'طرد العضو' : 'حذف الرسالة'}`
        );
      }

      // عرض الحالة
      if (opt === 'حالة') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? 'مفعلة ✅' : 'متوقفة ❌';
        const action = settings.antigroupmentionAction === 'kick' ? 'طرد' : 'حذف';

        return extra.reply(
          `📊 *إعدادات الحماية:*\n` +
          `الحالة: ${status}\n` +
          `الإجراء: ${action}`
        );
      }

      return extra.reply('❌ استخدم الأمر بشكل صحيح.');

    } catch (error) {
      await extra.reply(`❌ حصل خطأ:\n${error.message}`);
    }
  }
};
