const economy = require('../../systems/economy');

const COOLDOWN = 2 * 60 * 1000;

module.exports = {
    name: 'plantar',
    description: 'Planta e colhe uma recompensa.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const remaining = economy.getRemainingCooldown(id, 'plantar');

        if (remaining > 0) {
            const segundos = Math.ceil(remaining / 1000);

            await sock.sendMessage(msg.key.remoteJid, {
                text: `🌱 Sua plantação ainda está crescendo!\n\n⏳ ${segundos}s restantes.`
            });

            return;
        }

        const reward = Math.floor(Math.random() * 501) + 200;

        economy.addMoney(id, reward);
        economy.addXP(id, 18);
        economy.setCooldown(id, 'plantar', COOLDOWN);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🌱 𝗣𝗟𝗔𝗡𝗧𝗔𝗥 〕━━━╮

🌾 Sua colheita ficou pronta!

💰 +R$ ${reward.toLocaleString('pt-BR')}
✨ +18 XP

🚜 Bom trabalho, fazendeiro!

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
