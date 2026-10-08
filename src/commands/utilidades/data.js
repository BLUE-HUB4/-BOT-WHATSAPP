module.exports = {
    name: 'data',
    description: 'Mostra a data atual.',

    async execute(sock, msg, args) {
        const agora = new Date();

        const data = agora.toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        });

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 📅 𝗗𝗔𝗧𝗔 〕━━━╮

🇧🇷 𝗗𝗮𝘁𝗮 𝗮𝘁𝘂𝗮𝗹:
📅 ${data}

╰━━━━━━━━━━━━━━╯`
        });
    }
};
