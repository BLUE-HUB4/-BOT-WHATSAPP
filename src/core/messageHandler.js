const commandHandler = require('./commandHandler');

async function messageHandler(sock) {
    sock.ev.on('messages.upsert', async ({ messages }) => {
        try {
            const msg = messages[0];

            if (!msg || !msg.message) return;
            if (msg.key.fromMe) return;

            const remoteJid = msg.key.remoteJid;

            const messageType = Object.keys(msg.message)[0];

            let text = '';

            if (messageType === 'conversation') {
                text = msg.message.conversation;
            } 
            else if (messageType === 'extendedTextMessage') {
                text = msg.message.extendedTextMessage.text;
            }

            if (!text) return;

            console.log('📩 Mensagem recebida:');
            console.log(`👤 De: ${remoteJid}`);
            console.log(`💬 ${text}`);

            // 🧠 Envia a mensagem para o sistema de comandos
            await commandHandler(sock, msg, text);

        } catch (error) {
            console.error('❌ Erro ao processar mensagem:', error);
        }
    });
}

module.exports = messageHandler;