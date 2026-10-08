module.exports = {
    name: 'hora',
    description: 'Mostra a hora atual.',

    async execute(sock, msg, args) {
        const agora = new Date();

        const hora = agora.toLocaleTimeString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🕐 𝗛𝗢𝗥𝗔 〕━━━╮

🇧🇷 𝗛𝗼𝗿𝗮 𝗮𝘁𝘂𝗮𝗹:
🕐 ${hora}

╰━━━━━━━━━━━━━━╯`
        });
    }
};
