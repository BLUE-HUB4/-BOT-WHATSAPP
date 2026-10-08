const connectWhatsApp = require('./src/core/connection');
const messageHandler = require('./src/core/messageHandler');

async function startBot() {
    console.log('🚀 Iniciando bot...');

    try {
        const sock = await connectWhatsApp();

        messageHandler(sock);

        console.log('👂 Sistema de mensagens iniciado!');
    } catch (error) {
        console.error('❌ Erro ao iniciar o bot:', error);
    }
}

startBot();