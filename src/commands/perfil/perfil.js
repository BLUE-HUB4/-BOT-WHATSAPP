const profileSystem = require('../../systems/profile');
const economy = require('../../systems/economy');

module.exports = {
    name: 'perfil',
    description: 'Mostra o perfil do usuário.',

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const id = msg.key.participant || msg.key.remoteJid;

        const profile = profileSystem.getProfile(id);
        const money = economy.getUser(id);

        const name =
            msg.pushName ||
            profile.name ||
            'Usuário';

        const required =
            profileSystem.getXPRequired(profile.level);

        const progress =
            Math.min(
                100,
                Math.floor(
                    (profile.xp / required) * 100
                )
            );

        const filled =
            Math.floor(progress / 10);

        const bar =
            '█'.repeat(filled) +
            '░'.repeat(10 - filled);

        const text =
`╭━━━〔 👤 𝗣𝗘𝗥𝗙𝗜𝗟 〕━━━╮
┃
┃ 👤 Nome: *${name}*
┃ 🏆 Nível: *${profile.level}*
┃
┃ ⭐ XP: *${profile.xp}/${required}*
┃ [${bar}] ${progress}%
┃
┃ 💰 Moedas:
┃ R$ ${money.money.toLocaleString('pt-BR')}
┃
┃ 💬 Mensagens: *${profile.messages}*
┃ ⚡ Comandos: *${profile.commands}*
┃
╰━━━━━━━━━━━━━━━━━━━━╯

🔥 Continue participando para
subir de nível!`;

        await sock.sendMessage(jid, {
            text
        });
    }
};
