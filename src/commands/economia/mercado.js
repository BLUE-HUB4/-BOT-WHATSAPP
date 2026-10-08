const investments = require('../../systems/investments');

module.exports = {
    name: 'mercado',
    description: 'Mostra o mercado de investimentos.',

    async execute(sock, msg, args) {
        try {
            const assets = investments.getAssets();

            let text = `╭━━━〔 📈 𝗠𝗘𝗥𝗖𝗔𝗗𝗢 〕━━━╮
┃
┃  ⚡ 𝗚𝗢𝗝𝗢 𝗜𝗡𝗩𝗘𝗦𝗧𝗠𝗘𝗡𝗧𝗦
┃  ─────────────────
┃  📊 Mercado de ativos
┃  💰 Preços em tempo real
┃
`;

            for (const [key, asset] of Object.entries(assets)) {
                const variation = investments.getMarketVariation(asset);

                let arrow = '➖';

                if (variation > 0) {
                    arrow = '🟢 ↑';
                } else if (variation < 0) {
                    arrow = '🔴 ↓';
                }

                const variationText =
                    `${variation >= 0 ? '+' : ''}${variation.toFixed(2)}%`;

                text += `┃
┃ ${asset.emoji} *${asset.name}*
┃ 🏷️ Código: \`${key}\`
┃ 💰 Preço: *R$ ${asset.price.toLocaleString('pt-BR')}*
┃ ${arrow} Variação: *${variationText}*
┃ ⚠️ Risco: *${asset.risk}*
┃ 💎 Dividendo: *${(asset.dividend * 100).toFixed(1)}%*
┃
`;
            }

            text += `╰━━━━━━━━━━━━━━━━━━━━╯

💡 *COMO INVESTIR*

📈 !investir <ativo> <valor>

Exemplo:
!investir gojo 1000

💼 !carteira
💸 !vender <ativo> <cotas>
📜 !historico
💎 !dividendos

⚠️ *ATENÇÃO*
Os investimentos fazem parte da economia virtual do bot.
Os preços podem subir ou cair.

⚡ _GOJO • Mercado Virtual_`;

            await sock.sendMessage(msg.key.remoteJid, {
                text
            });

        } catch (error) {
            console.error('❌ Erro no comando mercado:', error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: '❌ Ocorreu um erro ao carregar o mercado.'
            });
        }
    }
};
