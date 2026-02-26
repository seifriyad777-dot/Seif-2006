// Anti-group mention handler
const handleAntigroupmention = async (sock, msg, groupMetadata) => {
  try {
    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;

    if (!from || !from.endsWith('@g.us')) return;

    const groupSettings = database.getGroupSettings(from);
    if (!groupSettings || !groupSettings.antigroupmention) return;

    let isGroupStatusMention = false;

    if (msg.message) {
      isGroupStatusMention =
        !!msg.message.groupStatusMentionMessage ||
        (msg.message.protocolMessage &&
         msg.message.protocolMessage.type === 25);
    }

    if (!isGroupStatusMention) return;

    const senderIsAdmin = await isAdmin(sock, sender, from, groupMetadata);
    const senderIsOwner = isOwner(sender);

    if (senderIsAdmin || senderIsOwner) return;

    const botIsAdmin = await isBotAdmin(sock, from, groupMetadata);
    const action = (groupSettings.antigroupmentionAction || 'delete').toLowerCase();

    try {
      await sock.sendMessage(from, { delete: msg.key });

      if (action === 'kick' && botIsAdmin) {
        await sock.groupParticipantsUpdate(from, [sender], 'remove');
      }

    } catch (err) {
      console.error('Antigroupmention Error:', err);
    }

  } catch (error) {
    console.error('Error in antigroupmention handler:', error);
  }
};
