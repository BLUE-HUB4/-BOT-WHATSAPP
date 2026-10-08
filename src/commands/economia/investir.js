const economy = require('../../systems/economy');
const investments = require('../../systems/investments');

module.exports = {
    name: 'investir',
    description: 'Investe dinheiro em um ativo.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const key = args[0]?.toLowerCase();
        const amount = Number(args[1]);

        if (!key || !amount || amount <= 0) {
            await sock.sendMessage(msg.key.remoteJid, {
                text:
`╭━━━〔 📈 𝗜𝗡𝗩𝗘𝗦𝗧𝗜𝗥 〕━━━╮

Use:

!investir <ativo> <valor>

Exemplo:
!investir gojo 1000

Veja os ativos:
!mercado

╰━━━━━━━━━━━━━━━━╯`
            });

            return;
        }

        const asset = investments.getAsset(key);

        if (!asset) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: `❌ O ativo *${key}* não existe.\n\nUse !mercado para ver os disponíveis.`
            });

            return;
        }

        const user = economy.getUser(id);

        if (user.money < amount) {
            await sock.sendMessage(msg.key.remoteJid, {
                text:
`❌ *Saldo insuficiente!*

💰 Seu saldo:
R$ ${user.money.toLocaleString('pt-BR')}

💸 Tentativa:
R$ ${amount.toLocaleString('pt-BR')}`
            });

            return;
        }

        economy.removeMoney(id, amount);

        const result = investments.buy(id, key, amount);

        if (!result.success) {
            economy.addMoney(id, amount);

            await sock.sendMessage(msg.key.remoteJid, {
                text: `❌ ${result.message}`
            });

            return;
        }

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 📈 𝗜𝗡𝗩𝗘𝗦𝗧𝗜𝗠𝗘𝗡𝗧𝗢 〕━━━╮

${asset.emoji} ${asset.name}

💸 Investido:
R$ ${amount.toLocaleString('pt-BR')}

📦 Cotas:
${result.quantity.toFixed(4)}

💰 Preço da cota:
R$ ${result.price.toLocaleString('pt-BR')}

⚠️ Risco:
${asset.risk}

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
