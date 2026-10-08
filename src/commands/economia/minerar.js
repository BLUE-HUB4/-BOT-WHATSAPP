const economy = require('../../systems/economy');

const COOLDOWN = 2 * 60 * 1000;

const achados = [
    ['🪨', 'Pedras preciosas', 150, 350],
    ['🪙', 'Ouro', 250, 600],
    ['💎', 'Diamantes', 500, 1200],
    ['🔮', 'Cristais raros', 700, 1500],
    ['💰', 'Tesouro perdido', 1000, 2000]
];

module.exports = {
    name: 'minerar',
    description: 'Minera para encontrar riquezas.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const remaining = economy.getRemainingCooldown(id, 'minerar');

        if (remaining > 0) {
            const segundos = Math.ceil(remaining / 1000);

            await sock.sendMessage(msg.key.remoteJid, {
                text:
`⛏️ *MINERAÇÃO*

Você ainda está minerando!

⏳ Aguarde ${segundos}s.`
            });

            return;
        }

        const item =
            achados[Math.floor(Math.random() * achados.length)];

        const reward =
            Math.floor(Math.random() * (item[3] - item[2] + 1)) + item[2];

        const xp = Math.floor(Math.random() * 21) + 20;

        economy.addMoney(id, reward);
        economy.addXP(id, xp);
        economy.setCooldown(id, 'minerar', COOLDOWN);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 ⛏️ 𝗠𝗜𝗡𝗘𝗥𝗔𝗥 〕━━━╮

🔎 Você encontrou:

${item[0]} ${item[1]}

💰 Recompensa:
+R$ ${reward.toLocaleString('pt-BR')}

✨ XP:
+${xp}

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
