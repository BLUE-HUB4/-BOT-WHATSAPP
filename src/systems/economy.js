const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/economy.json');

function ensureFile() {
    const folder = path.dirname(filePath);

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}');
    }
}

function loadData() {
    ensureFile();

    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
        return {};
    }
}

function saveData(data) {
    ensureFile();

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 2)
    );
}

function createUser(id) {
    const data = loadData();

    if (!data[id]) {
        data[id] = {
            money: 0,
            bank: 0,
            xp: 0,
            daily: 0,
            cooldowns: {}
        };

        saveData(data);
    }

    return data[id];
}

function getUser(id) {
    const data = loadData();

    if (!data[id]) {
        data[id] = {
            money: 0,
            bank: 0,
            xp: 0,
            daily: 0,
            cooldowns: {}
        };

        saveData(data);
    }

    return data[id];
}

function updateUser(id, changes) {
    const data = loadData();

    if (!data[id]) {
        data[id] = {
            money: 0,
            bank: 0,
            xp: 0,
            daily: 0,
            cooldowns: {}
        };
    }

    Object.assign(data[id], changes);

    saveData(data);

    return data[id];
}

function addMoney(id, amount) {
    const user = getUser(id);

    user.money += amount;

    const data = loadData();
    data[id] = user;

    saveData(data);

    return user.money;
}

function removeMoney(id, amount) {
    const user = getUser(id);

    if (user.money < amount) {
        return false;
    }

    user.money -= amount;

    const data = loadData();
    data[id] = user;

    saveData(data);

    return true;
}

function addXP(id, amount) {
    const user = getUser(id);

    user.xp += amount;

    const data = loadData();
    data[id] = user;

    saveData(data);

    return user.xp;
}

function getCooldown(id, command) {
    const user = getUser(id);

    return user.cooldowns?.[command] || 0;
}

function setCooldown(id, command, milliseconds) {
    const data = loadData();

    if (!data[id]) {
        createUser(id);
    }

    data[id].cooldowns[command] = Date.now() + milliseconds;

    saveData(data);
}

function getRemainingCooldown(id, command) {
    const cooldown = getCooldown(id, command);

    return Math.max(0, cooldown - Date.now());
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    addMoney,
    removeMoney,
    addXP,
    getCooldown,
    setCooldown,
    getRemainingCooldown
};
