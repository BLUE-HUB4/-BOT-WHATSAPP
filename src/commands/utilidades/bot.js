module.exports = {
    name: 'bot',
    description: 'Mostra informações do sistema.',

    async execute(sock, msg, args) {
        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🤖 𝗚𝗢𝗝𝗢 𝗕𝗢𝗧 〕━━━╮

⚡ 𝗦𝘁𝗮𝘁𝘂𝘀: Online
🧠 𝗦𝗶𝘀𝘁𝗲𝗺𝗮: Node.js
📡 𝗖𝗼𝗻𝗲𝘅𝗮̃𝗼: WhatsApp
🔥 𝗩𝗲𝗿𝘀𝗮̃𝗼: 1.0.0

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
