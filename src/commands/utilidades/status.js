module.exports = {
    name: 'status',
    description: 'Mostra o status do bot.',

    async execute(sock, msg, args) {
        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 📊 𝗦𝗧𝗔𝗧𝗨𝗦 〕━━━╮

🤖 𝗕𝗼𝘁: GOJO
🟢 𝗖𝗼𝗻𝗲𝘅𝗮̃𝗼: Ativa
⚡ 𝗦𝘁𝗮𝘁𝘂𝘀: Online
🧠 𝗦𝗶𝘀𝘁𝗲𝗺𝗮: Operacional

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
