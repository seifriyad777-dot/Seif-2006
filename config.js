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
    sessionID: process.env.SESSION_ID || 'KnightBot!H4sIAAAAAAAAA5VUyZKrNhT9F23taiMzeKjqqgBtMKZtBs9OvYUMAmQzGQlseOV1PiW/lPxNCnd3+i2Sl85Ouro69+jcc/UdpBmh2MQ1GH8HeUEqxHC7ZHWOwRgoZRDgAnSBjxgCY3CW1YvRKNA9u3nVP16DoWzZE/U4hZWQSyZvOVzRmb8EVcI9g3sX5OUxJt5PAeV9vSOmuGGL6TRsuDPdFpElSNi7VIoT8NYuNncJNMn+GdxbREQKkoaTPMIJLlBs4tpGpPga/eS1R6Paqmp4gyK8CKt6STnF6V3qtb/U9/2Vb6eqqTiGNvkafa2eD3pQvDJeGAzY7bxf2GiZ9a3gsIgPGzE58sXQtpkbnydv9CkJU+wbPk4ZYfWXdZ/oln5SmtW6E8t7bFbpnixxPH2dSFt9UV5HehTkfW0Bi773NeKLYVDINuQOhFZ9+hLFjdpBS+m80A/rAs/162ZOhr3RTlp7PxK3iw+vnP+P7n0ZibHqBm5HgueB4uXXlWv1Qk4h0RpHxgp2StLRBsmKN75GnxNlD4ZzKbhmToSK4wXNRMzW8ynyitcXc+6sbc84lmxV7z/pI1YWP2Opnw8zsnTPrqfd9KVgrzWddeZNtLRixQpOUaCEw9ElgVwUTvuxMtc7/Gg/NH07gIXZSU7VRbJn11NeG/taVzfb6UuTn5znx4vOuDZ8MIb3LihwSCgrECNZ+ohJ/S5AfrXEXoHZQ16wIs6BmiqWZ0cjYdrROHhqtdBmsTKaZXioOvrOGmnMo7fwGXRBXmQephT7U0JZVtRzTCkKMQXjX791QYpv7K1xbTkedkFACsrWaZnHGfI/uvpxiDwvK1O2rFNPbRe4AGPuM4wZI2lIWx3LFBVeRCqsRohRMA5QTPHfL8QF9t9jXRAjyuwiy6eIRmAMoClEUwF0QZGVLZyRBtlPOqMqhqHKodoq+c6jzfYxQySmbYJ9uUW5oE1mVS+cc7qurENZDWXwyfvDAG8C35IVyUR9IM6CixQftLUIJzwvzsrXVRMrUtMcJq6/lYRCyZ7/AaR1y2h33hxhmYlNvoO1vKHbXjBxAjtV4GCJnPXLXj25kAyiLFeZzm1eD53JDrn61G4OorCdNT19HvbChHaGG9+ZytPVUG7d0gU+roiHfyymNb38xvOnfLdBUmTerpVnOzFPj/7EqF5WofdyUqL4NVke9qiZBa6105zG0jR+26TUO9pzQ9o14mhf36i4yfO539/fIvnNmsljJojfzikHoSCIvACFwRgOf6FP17azKM+fUsxAF6SozQZ//vbH70+gC+LHLQgFaTiCfF+QJDgS24vtwcfUxe+/HXn4sa3UbgOCH5/HO+J/Vn7TpPUod+/+gPH+Hf2LcRTvcBYullt2ljupzLfuxvLdxaizPBJuKDqYDvvuZLcpS/OKwP3+rQvyGLEgKxIwBjQ5IvBmXflzJlYkwZShJAdjOBj0ITca8Nz9LzZI3TpJBwAA',
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
