// commands/admin/groupstats.js

const { getStats } = require('../../utils/groupstats');

module.exports = {
    name: 'groupstats',
    aliases: [
        'stats',
        'leaderboard',
        'gstats',
        'topmembers',
        'msgs',
        'messagestats',
        'إحصائيات',
        'الأكثر_نشاطًا'
    ],
    category: 'general',
    description: 'عرض إحصائيات نشاط الجروب اليوم',
    usage: 'إحصائيات',
    groupOnly: true,

    async execute(sock, msg, args, extra) {
        try {
            const from = extra.from;
            const stats = getStats(from);

            if (!stats)
                return extra.reply('📊 لا يوجد نشاط مسجل اليوم.');

            const { total, users } = stats;

            const sortedUsers = Object.entries(users)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            let topText = sortedUsers.length
                ? sortedUsers
                    .map(([id, count], i) =>
                        `${i + 1}) @${id.split('@')[0]} — ${count} رسالة`
                    )
                    .join('\n')
                : 'لا يوجد أعضاء نشطين حتى الآن.';

            const text = `
╭━━『 📊 إحصائيات الجروب اليوم 』━━╮

📌 إجمالي الرسائل: ${total}

👥 أكثر الأعضاء نشاطًا:
${topText}

💡 اكتب "نشاطي" لمعرفة إحصائياتك.
╰━━━━━━━━━━━━━━━━━━━━╯
`.trim();

            await sock.sendMessage(from, {
                text,
                mentions: sortedUsers.map(u => u[0])
            }, { quoted: msg });

        } catch (err) {
            console.error('[groupstats cmd] error:', err);
            extra.reply('❌ حدث خطأ أثناء تحميل الإحصائيات.');
        }
    }
};
