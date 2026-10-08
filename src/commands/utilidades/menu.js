const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    description: 'Mostra o menu principal do bot.',

    async execute(sock, msg, args) {
        try {
            const jid = msg.key.remoteJid;

            const commandsPath = path.join(__dirname, '../');

            const categories = {
                '🧰 UTILIDADES': 'utilidades',
                '👤 PERFIL': 'perfil',
                '🏆 RANKING': 'ranking',
                '💰 ECONOMIA': 'economia',
                '🎮 JOGOS': 'jogos',
                '😂 ZUEIRA': 'zueira',
                '🛡️ ADMIN': 'admin',
                '👑 OWNER': 'owner',
                '👥 GRUPO': 'grupo',
                '📥 DOWNLOADS': 'downloads',
                '🎵 MÚSICA': 'musica'
            };

            let text = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃
┃       ⚡ 𝗚𝗢𝗝𝗢 𝗕𝗢𝗧
┃       𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟
┃
┃   🚀 Rápido • Completo • Premium
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

👋 Olá, *${msg.pushName || 'Usuário'}*!

📌 Prefixo: *!*
📚 Comandos disponíveis abaixo.

`;

            for (const [title, folder] of Object.entries(categories)) {
                const folderPath = path.join(commandsPath, folder);

                if (!fs.existsSync(folderPath)) {
                    continue;
                }

                const files = fs
                    .readdirSync(folderPath)
                    .filter(file => file.endsWith('.js'))
                    .filter(file => file !== 'menu.js')
                    .sort();

                if (files.length === 0) {
                    continue;
                }

                text += `╭━━━〔 ${title} 〕━━━╮\n`;

                for (const file of files) {
                    const command = file
                        .replace('.js', '')
                        .toLowerCase();

                    text += `┃ ⚡ !${command}\n`;
                }

                text += `╰━━━━━━━━━━━━━━━━━━━━╯\n\n`;
            }

            text += `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃
┃ 💡 *COMO USAR*
┃
┃ !comando
┃ !comando argumento
┃
┃ 📌 Exemplo:
┃ !perfil
┃ !saldo
┃ !ping
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

⚡ 𝗚𝗢𝗝𝗢 𝗕𝗢𝗧
🔥 Sistema em constante evolução`;

            await sock.sendMessage(jid, {
                text
            });

        } catch (error) {
            console.error('❌ Erro no menu:', error);

            await sock.sendMessage(msg.key.remoteJid, {
                text: '❌ Não foi possível carregar o menu.'
            });
        }
    }
};
