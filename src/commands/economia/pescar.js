const economy = require('../../systems/economy');

const COOLDOWN = 2 * 60 * 1000;

const peixes = [
    ['🐟', 'Peixe comum', 100, 250],
    ['🐠', 'Peixe tropical', 200, 450],
    ['🐡', 'Baiacu raro', 300, 650],
    ['🦈', 'Tubarão', 700, 1300],
    ['🐋', 'Grande captura', 1000, 1800]
];

module.exports = {
    name: 'pescar',
    description: 'Pesca para ganhar dinheiro.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const remaining = economy.getRemainingCooldown(id, 'pescar');

        if (remaining > 0) {
            const segundos = Math.ceil(remaining / 1000);

            await sock.sendMessage(msg.key.remoteJid, {
                text: `🎣 Espere ${segundos}s antes de pescar novamente!`
            });

            return;
        }

        const peixe =
            peixes[Math.floor(Math.random() * peixes.length)];

        const reward =
            Math.floor(Math.random() * (peixe[3] - peixe[2] + 1)) + peixe[2];

        economy.addMoney(id, reward);
        economy.addXP(id, 15);
        economy.setCooldown(id, 'pescar', COOLDOWN);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🎣 𝗣𝗘𝗦𝗖𝗔 〕━━━╮

🎣 Você pescou:

${peixe[0]} ${peixe[1]}

💰 +R$ ${reward.toLocaleString('pt-BR')}
✨ +15 XP

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
