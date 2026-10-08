const economy = require('../../systems/economy');

const COOLDOWN = 2 * 60 * 1000;

module.exports = {
    name: 'cozinhar',
    description: 'Cozinha para ganhar dinheiro.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const remaining = economy.getRemainingCooldown(id, 'cozinhar');

        if (remaining > 0) {
            const segundos = Math.ceil(remaining / 1000);

            await sock.sendMessage(msg.key.remoteJid, {
                text: `🍳 A cozinha ainda está ocupada!\n\n⏳ Aguarde ${segundos}s.`
            });

            return;
        }

        const pratos = [
            '🍔 Hambúrguer artesanal',
            '🍕 Pizza especial',
            '🍝 Macarrão premium',
            '🍰 Bolo especial',
            '🍣 Sushi'
        ];

        const prato = pratos[Math.floor(Math.random() * pratos.length)];
        const reward = Math.floor(Math.random() * 601) + 250;

        economy.addMoney(id, reward);
        economy.addXP(id, 22);
        economy.setCooldown(id, 'cozinhar', COOLDOWN);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🍳 𝗖𝗢𝗭𝗜𝗡𝗛𝗔𝗥 〕━━━╮

👨‍🍳 Prato preparado:
${prato}

💰 +R$ ${reward.toLocaleString('pt-BR')}
✨ +22 XP

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
