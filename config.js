/**
 * Global Configuration for WhatsApp MD Bot
 */

module.exports = {
    // Bot Owner Configuration
    ownerNumber: ['201061891947','201144534147'],
    ownerName: ['Seif ', 'Professor'],
    
    // Bot Configuration
    botName: 'نايت بوت',
    prefix: '', // 👈 خلى الأوامر بدون نقطة
    sessionName: 'session',
    sessionID: process.env.SESSION_ID || 'KnightBot!H4sIAAAAAAAAA5VU25KqRhT9l34d6whKg1o1VeGmKAwoFxVTeWigxR7uDYh6yud8Sn4p+ZsUzpkz5yE5mfDU9GXttfdae38FeUFqrOMrmH0FJSVn1OB+2VxLDGZAao9HTMEARKhBYAYWcl51zNjY2Ktxp8CyNc7D025/K2Q2tdD54KntJFTCxXLLPIP7AJRtkJLwJ4CKXBpGuL5ufX6vWNN0dVKTkbkfa452g35UdxK+5PvJrVSSZ3DvERGhJI/V8oQzTFGq4+saEfo5+p6mBCJv7hwZ+pD4xLWCoeVW0+4cSXB6S1xnUa0KN3Kzl8/RD3ZqOMZbp4z8bEWelMO0VYJWg4faWpV+XFnxCWrJk77PJ2/0axLnOFpGOG9Ic/103TfW0HAx5c0aawvbOtWXgltalrCe+PBSbctNzUWUj8T1vv4cceRvPKdZ74bKxqDlSJM1iTF2V01hRngUhVP9sNG0W6KLYvIj8TV990ryf+rOiArXMtTjOPjaFmanKnJVWhixiyUspE7Xw7lgVkOL3XWfoz/mBEheqTTsRg4feTga2no0shduKIS5ypQmsTe5fFxNE+aDPmpa+jOWx7NvmD53iO1iLmt5PBG3Vmbv6EHCycrb3s7CWkmHodIwpMBqpfC48aB+oayws31FXtUHL5HHFSt1egqRcqCReVbi50dGCb4uIzBj7wNAcUzqhqKGFHm/xzEDgKKzg0OKm0d1wcsKDQPBfA2szoz8Rojgem5cjVV2NrP65bZ0WrTxqOidvfAZDEBJixDXNY40UjcFvb7gukYxrsHs198GIMeX5k23PtqYHYAjoXXj5W2ZFih6F/X9EIVh0eaNc81DuV9gCmbMxzZuGpLHdV/GNkc0PJEzlk+oqcHsiNIaf08QUxyBWUNb/L1p5SJ61H3uSApUXDAA2UMPEoEZGDEsy3FwzLGcMGOFX+ovXQ+LyvJLjhswADnqb4O/fv/zjy9gANLHK5bl+MmUHY84nmensH/YH9y/E+7xI9wgktZgBuR1dTmV3FxdB2L8wiwW0iYW5VgEHwm+G+VNiUvmkgIuBLg6Vnx6mHuQVcdjuGoN95ZK/O12UO1ox3NUKp7/AQTMgMm5BIreWtX33ok3zVjsJI5sg8xglRFs90nLVMZSZ6tbsOBD9mi7ayfAiv/aGcpcOXq3SbHkTlblHzdNOfal01GGSvfcR4vwmYT4x2CCde2GihgUnLoKhkqxaCtffbIiAq0npnq6JiSj49jdxcocn4NXyYFBnWyrBLZXwdwIrM93e3urh1qbubfA4iG/L6XuzcKPFkq/jS7ycFcvXf97JPgxCb5J9J9SvhHvHcfcBz9gfJst/9KfUnhIuMqy2ydnz7flzt5akW1On5yAMBO4wfVkZKv7bdvqHQL3+28DUKaoORY0AzNQZwECA0CLtvfvMj8WP4kkS8ulLMZyn3aK6kb86AmXZLhuUFaCGSsII5ZhBQjfbq1pUWqoPvW21LmTxvUGv4pl6TSoeW8xIPafaujg/jf8EsEafQcAAA==',
    newsletterJid: '120363161513685998@newsletter',
    updateZipUrl: 'https://github.com/mruniquehacker/KnightBot-Mini/archive/refs/heads/main.zip',
    
    packname: 'نايت بوت',

    selfMode: false,
    autoRead: false,
    autoTyping: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot',
    autoDownload: false,
    
    defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete',
      antitag: false,
      antitagAction: 'delete',
      antiall: false,
      antiviewonce: false,
      antibot: false,
      anticall: false,
      antigroupmention: false,
      antigroupmentionAction: 'delete',
      welcome: false,
      welcomeMessage: '╭╼━≪•عضو جديد•≫━╾╮\n┃مرحبًا: @user 👋\n┃عدد الأعضاء: #memberCount\n┃الوقت: time ⏰\n╰━━━━━━━━━━━━━━━╯\n\n*@user* أهلاً بك في *@group*! 🎉\n*وصف الجروب*\ngroupDesc\n\n> *تم التشغيل بواسطة botName*',
      goodbye: false,
      goodbyeMessage: 'وداعًا @user 👋 نتمنى لك التوفيق!',
      antiSpam: false,
      antidelete: false,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false
    },
    
    apiKeys: {
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    messages: {
      wait: '⏳ من فضلك انتظر...',
      success: '✅ تم التنفيذ بنجاح!',
      error: '❌ حدث خطأ!',
      ownerOnly: '👑 الأمر ده خاص بمالك البوت فقط!',
      adminOnly: '🛡️ الأمر ده خاص بمشرفين الجروب فقط!',
      groupOnly: '👥 الأمر ده يعمل داخل الجروبات فقط!',
      privateOnly: '💬 الأمر ده يعمل في الخاص فقط!',
      botAdminNeeded: '🤖 لازم البوت يكون مشرف عشان ينفذ الأمر!',
      invalidCommand: '❓ أمر غير صحيح! اكتب menu لعرض الأوامر'
    },
    
    timezone: 'Africa/Cairo',
    maxWarnings: 3,
    
    social: {
      github: '',
      instagram: '',
      youtube: ''
    }
};
