const economy = require('../../systems/economy');
const investments = require('../../systems/investments');

module.exports = {
    name: 'vender',
    description: 'Vende um investimento.',

    async execute(sock, msg, args) {
        const id = msg.key.participant || msg.key.remoteJid;

        const key = args[0]?.toLowerCase();
        const quantity = Number(args[1]);

        if (!key || !quantity || quantity <= 0) {
            await sock.sendMessage(msg.key.remoteJid, {
                text:
`📈 *COMO VENDER*

Use:

!vender <ativo> <cotas>

Exemplo:

!vender gojo 0.5`
            });

            return;
        }

        const result =
            investments.sell(id, key, quantity);

        if (!result.success) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: `❌ ${result.message}`
            });

            return;
        }

        economy.addMoney(id, result.value);

        const asset = investments.getAsset(key);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 💸 𝗩𝗘𝗡𝗗𝗔 〕━━━╮

${asset.emoji} ${asset.name}

📦 Cotas vendidas:
${quantity.toFixed(4)}

💰 Valor recebido:
R$ ${result.value.toLocaleString('pt-BR')}

📈 Preço atual:
R$ ${result.price.toLocaleString('pt-BR')}

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
