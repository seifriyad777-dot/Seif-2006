/**
 * Sticker to Image - تحويل الملصق إلى صورة
 */

const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { webp2png } = require('../../utils/webp2mp4');

module.exports = {
  name: 'simage',
  aliases: ['toimg', 'stickertoimg', 'sticker2img', 'svideo', 'صورة', 'تحويل'],
  category: 'general',
  description: 'تحويل الملصق إلى صورة (PNG) أو فيديو إذا كان متحرك',
  usage: 'صورة (بالرد على ملصق)',
  
  async execute(sock, msg, args, extra) {
    try {
      const notStickerMessage = '📎 قم بالرد على ملصق لتحويله إلى صورة!';
      
      const ctxInfo = msg.message?.extendedTextMessage?.contextInfo;
      if (!ctxInfo?.quotedMessage) {
        return await extra.reply(notStickerMessage);
      }
      
      const targetMessage = {
        key: {
          remoteJid: extra.from,
          id: ctxInfo.stanzaId,
          participant: ctxInfo.participant,
        },
        message: ctxInfo.quotedMessage,
      };
      
      const stickerMessage = targetMessage.message?.stickerMessage;
      if (!stickerMessage) {
        return await extra.reply(notStickerMessage);
      }
      
      const stickerBuffer = await downloadMediaMessage(
        targetMessage,
        'buffer',
        {},
        { logger: undefined, reuploadRequest: sock.updateMediaMessage },
      );
      
      if (!stickerBuffer) {
        return await extra.reply('❌ فشل تحميل الملصق، حاول مرة أخرى.');
      }
      
      const isAnimated = stickerMessage.isAnimated || stickerMessage.mimetype?.includes('animated');
      
      if (isAnimated) {
        const { webp2mp4 } = require('../../utils/webp2mp4');
        const mp4Buffer = await webp2mp4(stickerBuffer);
        
        if (!mp4Buffer || mp4Buffer.length === 0) {
          throw new Error('الملف الناتج فارغ.');
        }
        
        const maxSize = 16 * 1024 * 1024;
        if (mp4Buffer.length > maxSize) {
          throw new Error('الفيديو الناتج كبير جدًا.');
        }
        
        await sock.sendMessage(extra.from, {
          video: mp4Buffer,
          mimetype: 'video/mp4',
          gifPlayback: true
        }, { quoted: msg });
      } else {
        const imageBuffer = await webp2png(stickerBuffer);
        
        await sock.sendMessage(extra.from, {
          image: imageBuffer
        }, { quoted: msg });
      }
      
    } catch (error) {
      console.error('Error in simage command:', error);
      await extra.reply('❌ فشل تحويل الملصق، حاول مرة أخرى.');
    }
  }
};
