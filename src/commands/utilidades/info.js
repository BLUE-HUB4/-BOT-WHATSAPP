module.exports = {
    name: 'info',
    description: 'Mostra informações do bot.',

    async execute(sock, msg, args) {
        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 ℹ️ 𝗜𝗡𝗙𝗢 〕━━━╮

🤖 𝗡𝗼𝗺𝗲: GOJO BOT
⚡ 𝗩𝗲𝗿𝘀𝗮̃𝗼: 1.0.0
🟢 𝗦𝘁𝗮𝘁𝘂𝘀: Online
📡 𝗣𝗿𝗲𝗳𝗶𝘅𝗼: !

╰━━━━━━━━━━━━━━╯`
        });
    }
};
