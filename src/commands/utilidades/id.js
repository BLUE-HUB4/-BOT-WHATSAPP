module.exports = {
    name: 'id',
    description: 'Mostra o ID da conversa.',

    async execute(sock, msg, args) {
        const id = msg.key.remoteJid;

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🆔 𝗜𝗗 〕━━━╮

📌 𝗜𝗗 𝗱𝗮 𝗰𝗼𝗻𝘃𝗲𝗿𝘀𝗮:
${id}

╰━━━━━━━━━━━━━━╯`
        });
    }
};
