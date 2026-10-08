const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/profiles.json');

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
        return JSON.parse(
            fs.readFileSync(filePath, 'utf8')
        );
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

function createProfile(id) {
    const data = loadData();

    if (!data[id]) {
        data[id] = {
            name: '',
            xp: 0,
            level: 1,
            messages: 0,
            commands: 0,
            wins: 0,
            losses: 0,
            createdAt: Date.now()
        };

        saveData(data);
    }

    return data[id];
}

function getProfile(id) {
    const data = loadData();

    if (!data[id]) {
        data[id] = {
            name: '',
            xp: 0,
            level: 1,
            messages: 0,
            commands: 0,
            wins: 0,
            losses: 0,
            createdAt: Date.now()
        };

        saveData(data);
    }

    return data[id];
}

function updateProfile(id, changes) {
    const data = loadData();

    if (!data[id]) {
        data[id] = {
            name: '',
            xp: 0,
            level: 1,
            messages: 0,
            commands: 0,
            wins: 0,
            losses: 0,
            createdAt: Date.now()
        };
    }

    Object.assign(data[id], changes);

    saveData(data);

    return data[id];
}

function addXP(id, amount) {
    const profile = getProfile(id);

    profile.xp += amount;

    let leveledUp = false;

    while (profile.xp >= getXPRequired(profile.level)) {
        profile.xp -= getXPRequired(profile.level);
        profile.level++;
        leveledUp = true;
    }

    const data = loadData();
    data[id] = profile;

    saveData(data);

    return {
        profile,
        leveledUp
    };
}

function getXPRequired(level) {
    return 100 + ((level - 1) * 50);
}

function addMessage(id) {
    const profile = getProfile(id);

    profile.messages++;

    const data = loadData();
    data[id] = profile;

    saveData(data);

    return profile;
}

function addCommand(id) {
    const profile = getProfile(id);

    profile.commands++;

    const data = loadData();
    data[id] = profile;

    saveData(data);

    return profile;
}

function getAllProfiles() {
    return loadData();
}

function getRanking(type = 'xp') {
    const data = loadData();

    return Object.entries(data)
        .sort(([, a], [, b]) => {
            return (b[type] || 0) - (a[type] || 0);
        });
}

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    addXP,
    getXPRequired,
    addMessage,
    addCommand,
    getAllProfiles,
    getRanking
};
