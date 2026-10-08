const economy = require('../../systems/economy');

const COOLDOWN = 2 * 60 * 1000;

const trabalhos = [
    {
        nome: 'Programador',
        emoji: '💻',
        min: 300,
        max: 700
    },
    {
        nome: 'Mecânico',
        emoji: '🔧',
        min: 250,
        max: 650
    },
    {
        nome: 'Eletricista',
        emoji: '⚡',
        min: 280,
        max: 720
    },
    {
        nome: 'Entregador',
        emoji: '🏍️',
        min: 180,
        max: 500
    },
    {
        nome: 'Construtor',
        emoji: '👷',
        min: 350,
        max: 800
    },
    {
        nome: 'Fotógrafo',
        emoji: '📸',
        min: 220,
        max: 550
    }
];

module.exports = {
    name: 'trabalho',
    description: 'Trabalha para ganhar dinheiro.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const remaining = economy.getRemainingCooldown(id, 'trabalho');

        if (remaining > 0) {
            const segundos = Math.ceil(remaining / 1000);

            await sock.sendMessage(msg.key.remoteJid, {
                text:
`╭━━━〔 ⏳ 𝗧𝗥𝗔𝗕𝗔𝗟𝗛𝗢 〕━━━╮

😴 Você precisa descansar!

⏱️ Aguarde ${segundos}s para trabalhar novamente.

╰━━━━━━━━━━━━━━━━╯`
            });

            return;
        }

        const trabalho =
            trabalhos[Math.floor(Math.random() * trabalhos.length)];

        const dinheiro =
            Math.floor(
                Math.random() *
                (trabalho.max - trabalho.min + 1)
            ) + trabalho.min;

        const xp = Math.floor(Math.random() * 16) + 10;

        economy.addMoney(id, dinheiro);
        economy.addXP(id, xp);
        economy.setCooldown(id, 'trabalho', COOLDOWN);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 💼 𝗧𝗥𝗔𝗕𝗔𝗟𝗛𝗢 〕━━━╮

${trabalho.emoji} 𝗣𝗿𝗼𝗳𝗶𝘀𝘀𝗮̃𝗼: ${trabalho.nome}

💰 𝗣𝗮𝗴𝗮𝗺𝗲𝗻𝘁𝗼:
+R$ ${dinheiro.toLocaleString('pt-BR')}

✨ 𝗫𝗣:
+${xp}

⏳ Próximo trabalho:
2 minutos

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
