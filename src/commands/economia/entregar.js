const economy = require('../../systems/economy');

const COOLDOWN = 2 * 60 * 1000;

module.exports = {
    name: 'entregar',
    description: 'Faz entregas para ganhar dinheiro.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const remaining = economy.getRemainingCooldown(id, 'entregar');

        if (remaining > 0) {
            const segundos = Math.ceil(remaining / 1000);

            await sock.sendMessage(msg.key.remoteJid, {
                text: `🏍️ Você ainda está fazendo uma entrega!\n\n⏳ ${segundos}s restantes.`
            });

            return;
        }

        const destinos = [
            '🏠 Casa',
            '🏢 Escritório',
            '🏪 Loja',
            '🏨 Hotel',
            '🍔 Restaurante'
        ];

        const destino =
            destinos[Math.floor(Math.random() * destinos.length)];

        const reward = Math.floor(Math.random() * 451) + 200;

        economy.addMoney(id, reward);
        economy.addXP(id, 16);
        economy.setCooldown(id, 'entregar', COOLDOWN);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 📦 𝗘𝗡𝗧𝗥𝗘𝗚𝗔 〕━━━╮

🏍️ Destino:
${destino}

📦 Entrega concluída!

💰 +R$ ${reward.toLocaleString('pt-BR')}
✨ +16 XP

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
