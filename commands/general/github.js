/**
 * GitHub Command - عرض مستودع البوت على GitHub
 */

const axios = require('axios');
const config = require('../../config');

module.exports = {
    name: 'github',
    aliases: ['repo', 'git', 'source', 'sc', 'script', 'المصدر', 'جيتهاب'],
    category: 'general',
    description: 'عرض مستودع البوت وإحصائياته',
    usage: 'المصدر',
    ownerOnly: false,

    async execute(sock, msg, args, extra) {
        try {
            const chatId = extra.from;
            
            const repoUrl = 'https://github.com/mruniquehacker/KnightBot-Mini';
            const apiUrl = 'https://api.github.com/repos/mruniquehacker/KnightBot-Mini';
            
            const loadingMsg = await extra.reply('🔄 جاري جلب معلومات المستودع...');
            
            try {
                const response = await axios.get(apiUrl, {
                    headers: { 'User-Agent': 'KnightBot-Mini' }
                });
                
                const repo = response.data;
                
                let message = `╭━━『 📂 مستودع البوت 』━━╮\n\n`;
                message += `🤖 اسم البوت: ${config.botName}\n`;
                message += `🔗 اسم المستودع: ${repo.name}\n`;
                message += `👨‍💻 المطور: ${repo.owner.login}\n`;
                message += `📄 الوصف: ${repo.description || 'لا يوجد وصف'}\n`;
                message += `🌐 الرابط: ${repo.html_url}\n\n`;
                
                message += `📊 إحصائيات المستودع\n`;
                message += `⭐ عدد النجوم: ${repo.stargazers_count.toLocaleString()}\n`;
                message += `🍴 عدد النسخ (Forks): ${repo.forks_count.toLocaleString()}\n`;
                message += `👁️ عدد المتابعين: ${repo.watchers_count.toLocaleString()}\n`;
                message += `📦 الحجم: ${(repo.size / 1024).toFixed(2)} MB\n\n`;
                
                message += `🔗 روابط سريعة\n`;
                message += `⭐ دعم المشروع: ${repo.html_url}/stargazers\n`;
                message += `🍴 إنشاء نسخة: ${repo.html_url}/fork\n`;
                message += `📥 تحميل مباشر: git clone ${repo.clone_url}\n\n`;
                
                message += `╰━━━━━━━━━━━━━━━━━━╯\n\n`;
                message += `> تم التشغيل بواسطة ${config.botName}`;
                
                await sock.sendMessage(chatId, {
                    text: message,
                    edit: loadingMsg.key
                });
                
            } catch (apiError) {
                console.error('GitHub API Error:', apiError.message);
                
                let fallbackMessage = `╭━━『 📂 مستودع البوت 』━━╮\n\n`;
                fallbackMessage += `🤖 اسم البوت: ${config.botName}\n`;
                fallbackMessage += `🌐 الرابط: ${repoUrl}\n\n`;
                fallbackMessage += `⚠️ تعذر جلب الإحصائيات المباشرة.\n`;
                fallbackMessage += `يرجى زيارة الرابط للاطلاع على التفاصيل.\n\n`;
                fallbackMessage += `╰━━━━━━━━━━━━━━━━━━╯`;
                
                await sock.sendMessage(chatId, {
                    text: fallbackMessage,
                    edit: loadingMsg.key
                });
            }
            
        } catch (error) {
            console.error('GitHub command error:', error);
            await extra.reply(`❌ حدث خطأ: ${error.message}`);
        }
    }
};
