/**
 * TTS - تحويل النص إلى صوت
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'tts',
  aliases: ['speak', 'say', 'نطق', 'صوت'],
  category: 'general',
  description: 'تحويل النص إلى رسالة صوتية',
  usage: 'نطق <النص>',
  
  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      const text = args.join(' ');

      if (!text) {
        return extra.reply('❌ اكتب النص بعد الأمر.\n\nمثال:\nنطق مرحبا يا سيف');
      }

      const audioUrl = await APIs.textToSpeech(text);

      const axios = require('axios');
      const audioResponse = await axios.get(audioUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      const audioBuffer = Buffer.from(audioResponse.data);

      await sock.sendMessage(chatId, {
        audio: audioBuffer,
        mimetype: 'audio/mp3',
        ptt: true
      }, { quoted: msg });

    } catch (error) {
      console.error('TTS command error:', error);
      await extra.reply('❌ فشل إنشاء الرسالة الصوتية، حاول مرة أخرى.');
    }
  }
};
