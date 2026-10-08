const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const qrcode = require('qrcode-terminal');

async function connectWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('./data/auth');

    console.log('📡 Criando conexão com WhatsApp...');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ['Gojo Bot', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('\n📱 ESCANEIE O QR CODE:\n');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'connecting') {
            console.log('🔄 Conectando ao WhatsApp...');
        }

        if (connection === 'open') {
            console.log('\n✅ WHATSAPP CONECTADO COM SUCESSO! 🔥');
        }

        if (connection === 'close') {
            const statusCode =
                lastDisconnect?.error?.output?.statusCode;

            console.log('❌ Conexão fechada. Código:', statusCode);

            if (statusCode !== DisconnectReason.loggedOut) {
                console.log('🔄 Tentando reconectar...');
                connectWhatsApp();
            } else {
                console.log('🚪 Sessão encerrada.');
            }
        }
    });

    return sock;
}

module.exports = connectWhatsApp;