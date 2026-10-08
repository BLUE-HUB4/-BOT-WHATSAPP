module.exports = {
    name: 'ping',

    description: 'Verifica se o bot está online.',

    async execute(sock, msg, args) {
        const start = Date.now();

        await sock.sendMessage(msg.key.remoteJid, {
            text: '🏓 Calculando...'
        });

        const ping = Date.now() - start;

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🏓 𝗣𝗢𝗡𝗚! 〕━━━╮

⚡ 𝗦𝘁𝗮𝘁𝘂𝘀: Online
📡 𝗟𝗮𝘁𝗲̂𝗻𝗰𝗶𝗮: ${ping}ms
🤖 𝗕𝗼𝘁: GOJO
🟢 𝗦𝗶𝘀𝘁𝗲𝗺𝗮: Operacional

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};