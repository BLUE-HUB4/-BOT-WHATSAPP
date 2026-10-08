const config = require('../../config');

async function getGroupMetadata(sock, jid) {
    try {
        return await sock.groupMetadata(jid);
    } catch (error) {
        console.error('❌ Erro ao obter informações do grupo:', error);
        return null;
    }
}

function getUserId(msg) {
    return (
        msg.key.participant ||
        msg.participant ||
        msg.key.remoteJid
    );
}

function normalizeJid(jid) {
    if (!jid) return '';

    return jid
        .trim()
        .toLowerCase()
        .replace(/:\d+(?=@)/, '');
}

async function isAdmin(sock, msg) {
    const jid = msg.key.remoteJid;

    if (!jid || !jid.endsWith('@g.us')) {
        return false;
    }

    const metadata = await getGroupMetadata(sock, jid);

    if (!metadata) return false;

    const userId = normalizeJid(getUserId(msg));

    const participant = metadata.participants.find(
        user => normalizeJid(user.id) === userId
    );

    return (
        participant?.admin === 'admin' ||
        participant?.admin === 'superadmin'
    );
}

async function isBotAdmin(sock, msg) {
    const jid = msg.key.remoteJid;

    if (!jid || !jid.endsWith('@g.us')) {
        return false;
    }

    const metadata = await getGroupMetadata(sock, jid);

    if (!metadata) return false;

    const botId = normalizeJid(sock.user?.id);

    const participant = metadata.participants.find(
        user => normalizeJid(user.id) === botId
    );

    return (
        participant?.admin === 'admin' ||
        participant?.admin === 'superadmin'
    );
}

function isOwnerGroup(msg) {
    return msg.key.remoteJid === config.owner.groupId;
}

async function requireAdmin(sock, msg) {
    const admin = await isAdmin(sock, msg);

    if (!admin) {
        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🚫 𝗔𝗖𝗘𝗦𝗦𝗢 𝗡𝗘𝗚𝗔𝗗𝗢 〕━━━╮

🛡️ Este comando é exclusivo
para administradores do grupo.

👤 Seu nível:
𝗠𝗘𝗠𝗕𝗥𝗢

╰━━━━━━━━━━━━━━━━╯`
        });

        return false;
    }

    return true;
}

async function requireBotAdmin(sock, msg) {
    const botAdmin = await isBotAdmin(sock, msg);

    if (!botAdmin) {
        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 🤖 𝗕𝗢𝗧 𝗦𝗘𝗠 𝗣𝗘𝗥𝗠𝗜𝗦𝗦𝗔̃𝗢 〕━━━╮

⚠️ Preciso ser administrador
do grupo para executar esta ação.

👑 Promova o bot para administrador
e tente novamente.

╰━━━━━━━━━━━━━━━━╯`
        });

        return false;
    }

    return true;
}

module.exports = {
    getGroupMetadata,
    getUserId,
    normalizeJid,
    isAdmin,
    isBotAdmin,
    isOwnerGroup,
    requireAdmin,
    requireBotAdmin
};
