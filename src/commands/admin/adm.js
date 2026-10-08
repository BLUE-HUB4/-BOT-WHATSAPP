module.exports = {
    name: 'adm',
    description: 'Painel administrativo em desenvolvimento.',

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        await sock.sendMessage(jid, {
            text:
`╭━━━〔 🛡️ 𝗚𝗢𝗝𝗢 • 𝗔𝗗𝗠𝗜𝗡 〕━━━╮
┃
┃ 🚧 𝗘𝗠 𝗗𝗘𝗦𝗘𝗡𝗩𝗢𝗟𝗩𝗜𝗠𝗘𝗡𝗧𝗢
┃
┃ O sistema de administração
┃ está sendo desenvolvido.
┃
┃ ⚙️ Estamos preparando:
┃
┃ • 👥 Gerenciamento de membros
┃ • 🔨 Ban / Kick
┃ • 👑 Promover / Rebaixar
┃ • 📢 Menções
┃ • 🔒 Controle do grupo
┃ • 🧹 Moderação
┃ • ⚙️ Configurações
┃
┃ ⏳ Em breve estará disponível!
┃
╰━━━━━━━━━━━━━━━━━━━━╯

⚡ 𝗚𝗢𝗝𝗢 𝗕𝗢𝗧`
        });
    }
};
