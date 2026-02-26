/**
 * Owner Command - عرض جهة اتصال مالك البوت
 */

const config = require('../../config');

module.exports = {
    name: 'owner',
    aliases: ['creator', 'dev', 'botowner', 'المالك', 'المطور'],
    category: 'general',
    description: 'عرض معلومات مالك البوت',
    usage: 'المالك',
    ownerOnly: false,

    async execute(sock, msg, args, extra) {
        try {
            const chatId = extra.from;

            const ownerNames = Array.isArray(config.ownerName) ? config.ownerName : [config.ownerName];

            const vCards = config.ownerNumber.map((num, index) => {
                const name = ownerNames[index] || ownerNames[0] || 'مالك البوت';
                return {
                    vcard: `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;waid=${num}:${num}
END:VCARD
                    `.trim()
                };
            });

            const displayName = ownerNames[0] || config.ownerName || 'مالك البوت';

            await sock.sendMessage(chatId, {
                contacts: {
                    displayName: displayName,
                    contacts: vCards
                }
            });

            await extra.reply('👑 ده رقم مالك البوت لو حابب تتواصل معاه.');

        } catch (error) {
            console.error('Owner command error:', error);
            await extra.reply(`❌ حدث خطأ: ${error.message}`);
        }
    }
};
