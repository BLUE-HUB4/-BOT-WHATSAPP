module.exports = {
    name: 'regras',
    description: 'Mostra as regras do grupo.',

    async execute(sock, msg, args) {
        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━〔 📜 𝗥𝗘𝗚𝗥𝗔𝗦 〕━━━╮

1️⃣ Respeite os membros.
2️⃣ Evite spam.
3️⃣ Não envie conteúdo proibido.
4️⃣ Não abuse dos comandos.
5️⃣ Respeite os administradores.
6️⃣ Divirta-se e mantenha a resenha saudável. 😎

╰━━━━━━━━━━━━━━━━╯`
        });
    }
};
