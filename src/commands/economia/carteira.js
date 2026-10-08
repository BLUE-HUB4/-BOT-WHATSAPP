const investments = require('../../systems/investments');

module.exports = {
    name: 'carteira',
    description: 'Mostra seus investimentos.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const portfolio = investments.getPortfolio(id);

        let total = 0;
        let text =
`╭━━━〔 💼 𝗖𝗔𝗥𝗧𝗘𝗜𝗥𝗔 〕━━━╮

`;

        const entries = Object.entries(portfolio.assets);

        if (entries.length === 0) {
            text +=
`📭 Sua carteira está vazia.

Use !mercado para encontrar investimentos.`;
        } else {
            for (const [key, investment] of entries) {
                const asset = investments.getAsset(key);

                if (!asset) continue;

                const value =
                    investment.quantity * asset.price;

                total += value;

                text +=
`${asset.emoji} ${asset.name}
📦 Cotas: ${investment.quantity.toFixed(4)}
💰 Valor: R$ ${value.toLocaleString('pt-BR')}

`;
            }

            text +=
`💎 𝗩𝗮𝗹𝗼𝗿 𝘁𝗼𝘁𝗮𝗹:
R$ ${total.toLocaleString('pt-BR')}`;
        }

        text += `

╰━━━━━━━━━━━━━━━━╯`;

        await sock.sendMessage(msg.key.remoteJid, {
            text
        });
    }
};
