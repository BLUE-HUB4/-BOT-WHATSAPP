const economy = require('../../systems/economy');

const COOLDOWN = 24 * 60 * 60 * 1000;

module.exports = {
    name: 'daily',
    description: 'Recebe sua recompensa diária.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const remaining = economy.getRemainingCooldown(id, 'daily');

        if (remaining > 0) {
            const horas = Math.ceil(remaining / 3600000);

            await sock.sendMessage(msg.key.remoteJid, {
                text:
`╭━━━〔 🎁 𝗗𝗔𝗜𝗟𝗬 〕━━━╮

⏳ Você já recebeu sua recompensa hoje!

🕐 Volte em aproximadamente ${horas}h.

╰━━━━━━━━━━━━━━━━╯`
            });

            return;
        }

        const reward = Math.floor(Math.random() * 501) + 500;

        economy.addMoney(id, reward);
        economy.addXP(id, 20);
        economy.setCooldown(id, 'daily', COOLDOWN);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🎁 𝗗𝗔𝗜𝗟𝗬 〕━━━╮

🎉 Recompensa recebida!

💰 +R$ ${reward.toLocaleString('pt-BR')}
✨ +20 XP

🔥 Volte amanhã para receber novamente!

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
