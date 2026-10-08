module.exports = {
    name: 'dono',
    description: 'Mostra informações do dono.',

    async execute(sock, msg, args) {
        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 👑 𝗗𝗢𝗡𝗢 〕━━━╮

🤖 𝗕𝗼𝘁: GOJO
👑 𝗗𝗼𝗻𝗼: Administrador
⚡ 𝗖𝗼𝗻𝘁𝗮𝘁𝗼: Disponível

╰━━━━━━━━━━━━━━╯`
        });
    }
};
