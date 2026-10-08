const economy = require('../../systems/economy');

module.exports = {
    name: 'saldo',
    description: 'Mostra seu saldo.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;
        const user = economy.getUser(id);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 💰 𝗦𝗔𝗟𝗗𝗢 〕━━━╮

👤 𝗨𝘀𝘂𝗮́𝗿𝗶𝗼: Você

💵 𝗖𝗮𝗿𝘁𝗲𝗶𝗿𝗮: R$ ${user.money.toLocaleString('pt-BR')}
🏦 𝗕𝗮𝗻𝗰𝗼: R$ ${user.bank.toLocaleString('pt-BR')}
✨ 𝗫𝗣: ${user.xp}

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
