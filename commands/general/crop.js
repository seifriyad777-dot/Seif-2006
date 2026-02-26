/**
 * Crop Command - قص صورة/فيديو/ملصق لمربع مثالي
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const webp = require('node-webpmux');
const config = require('../../config');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const getQuotedMessage = (message) =>
  message.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
  message.message?.buttonsResponseMessage?.contextInfo?.quotedMessage ||
  message.message?.listResponseMessage?.contextInfo?.quotedMessage ||
  null;

const resolveMedia = (message) => {
  const messageType = Object.keys(message.message || {})[0];
  if (['imageMessage','stickerMessage','videoMessage','documentMessage'].includes(messageType)) {
    return { type: messageType, media: message.message[messageType] };
  }
  const quoted = getQuotedMessage(message);
  if (!quoted) return null;
  const quotedType = Object.keys(quoted || {})[0];
  if (['imageMessage','stickerMessage','videoMessage','documentMessage'].includes(quotedType)) {
    return { type: quotedType, media: quoted[quotedType] };
  }
  return null;
};

module.exports = {
  name: 'crop',
  aliases: ['square', 'cropper', 'قص'],
  description: 'قص صورة أو فيديو أو ملصق ليصبح مربع مثالي',
  usage: 'قص (بالرد على صورة/فيديو/ملصق)',
  category: 'general',
  
  async execute(sock, msg, args, extra) {

    const tmpDir = getTempDir();
    const tempInput = path.join(tmpDir, `temp_${Date.now()}`);
    const tempOutput = path.join(tmpDir, `crop_${Date.now()}.webp`);
    const tempFiles = [tempInput, tempOutput];
    
    try {
      const messageToQuote = msg;
      let targetMessage = msg;

      if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const quotedInfo = msg.message.extendedTextMessage.contextInfo;
        targetMessage = {
          key: {
            remoteJid: extra.from,
            id: quotedInfo.stanzaId,
            participant: quotedInfo.participant
          },
          message: quotedInfo.quotedMessage
        };
      }

      const mediaInfo = resolveMedia(targetMessage);
      
      if (!mediaInfo) {
        return extra.reply('✂️ قم بالرد على صورة أو فيديو أو ملصق ليتم قصه.');
      }

      const { type, media } = mediaInfo;

      const mediaBuffer = await downloadMediaMessage(
        targetMessage,
        'buffer',
        {},
        { logger: undefined, reuploadRequest: sock.updateMediaMessage }
      );

      if (!mediaBuffer) {
        return extra.reply('❌ فشل تحميل الوسائط، حاول مرة أخرى.');
      }

      if (mediaBuffer.length > MAX_FILE_SIZE) {
        return extra.reply(`❌ الملف كبير جدًا: ${(mediaBuffer.length / 1024 / 1024).toFixed(2)}MB (الحد الأقصى 50MB)`);
      }

      fs.writeFileSync(tempInput, mediaBuffer);

      const isAnimated = media.mimetype?.includes('gif') || 
                         media.mimetype?.includes('video') || 
                         media.seconds > 0 ||
                         type === 'videoMessage';

      const fileSizeKB = mediaBuffer.length / 1024;
      const isLargeFile = fileSizeKB > 5000;

      let ffmpegCommand;
      
      if (isAnimated) {
        if (isLargeFile) {
          ffmpegCommand = `ffmpeg -i "${tempInput}" -t 2 -vf "crop=min(iw\\,ih):min(iw\\,ih),scale=512:512,fps=8" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 30 -compression_level 6 -b:v 100k -max_muxing_queue_size 1024 "${tempOutput}"`;
        } else {
          ffmpegCommand = `ffmpeg -i "${tempInput}" -t 3 -vf "crop=min(iw\\,ih):min(iw\\,ih),scale=512:512,fps=12" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 50 -compression_level 6 -b:v 150k -max_muxing_queue_size 1024 "${tempOutput}"`;
        }
      } else {
        ffmpegCommand = `ffmpeg -i "${tempInput}" -vf "crop=min(iw\\,ih):min(iw\\,ih),scale=512:512,format=rgba" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 75 -compression_level 6 "${tempOutput}"`;
      }

      await new Promise((resolve, reject) => {
        exec(ffmpegCommand, (error, stdout, stderr) => {
          if (error) reject(error);
          else resolve();
        });
      });

      if (!fs.existsSync(tempOutput)) {
        throw new Error('فشل إنشاء الملف.');
      }

      let webpBuffer = fs.readFileSync(tempOutput);

      const img = new webp.Image();
      await img.load(webpBuffer);

      const json = {
        'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
        'sticker-pack-name': config.packname || 'ملصقات البوت',
        'emojis': ['✂️']
      };

      const exifAttr = Buffer.from([0x49,0x49,0x2A,0x00,0x08,0x00,0x00,0x00,0x01,0x00,0x41,0x57,0x07,0x00,0x00,0x00,0x00,0x00,0x16,0x00,0x00,0x00]);
      const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
      const exif = Buffer.concat([exifAttr, jsonBuffer]);
      exif.writeUIntLE(jsonBuffer.length, 14, 4);

      img.exif = exif;
      const finalBuffer = await img.save(null);

      await sock.sendMessage(extra.from, { 
        sticker: finalBuffer
      }, { quoted: messageToQuote });

    } catch (error) {
      console.error('Crop command error:', error);
      await extra.reply('❌ فشل قص الوسائط. تأكد أن الملف صالح.');
    } finally {
      tempFiles.forEach(file => deleteTempFile(file));
    }
  }
};
