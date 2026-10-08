module.exports = {
    name: 'uptime',
    description: 'Mostra há quanto tempo o bot está online.',

    async execute(sock, msg, args) {
        const segundos = Math.floor(process.uptime());

        const dias = Math.floor(segundos / 86400);
        const horas = Math.floor((segundos % 86400) / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const secs = segundos % 60;

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 ⏱️ 𝗨𝗣𝗧𝗜𝗠𝗘 〕━━━╮

🟢 𝗕𝗼𝘁: Online
📅 𝗗𝗶𝗮𝘀: ${dias}
🕐 𝗛𝗼𝗿𝗮𝘀: ${horas}
⏳ 𝗠𝗶𝗻𝘂𝘁𝗼𝘀: ${minutos}
⏱️ 𝗦𝗲𝗴𝘂𝗻𝗱𝗼𝘀: ${secs}

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
