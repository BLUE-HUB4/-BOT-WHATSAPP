module.exports = {
    name: 'versao',
    description: 'Mostra a versão do bot.',

    async execute(sock, msg, args) {
        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🔢 𝗩𝗘𝗥𝗦𝗔̃𝗢 〕━━━╮

🤖 𝗕𝗼𝘁: GOJO
📦 𝗩𝗲𝗿𝘀𝗮̃𝗼: 1.0.0
🟢 𝗦𝘁𝗮𝘁𝘂𝘀: Atualizado

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
