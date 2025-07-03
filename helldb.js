import fs from 'node:fs';

function createDB(db, initialStructure = {}) {
    fs.writeFileSync(db, JSON.stringify(initialStructure, null, 2));
}

function getDB(db) {
    if (!fs.existsSync(db)) {
        createDB(db);
    }
    try {
        const data = fs.readFileSync(db, 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (err) {
        console.error(err);
    }
}

function writeDB(db, write) {
    if (!fs.existsSync(db)) {
        createDB(db);
    }
    fs.writeFileSync(db, write, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function addValue(dbval, table, values) {
    const db = getDB(dbval);
    if (!db[table]) db[table] = {};
    Object.keys(values).forEach((field) => {
        if (!db[table][field]) db[table][field] = [];
        db[table][field].push(values[field]);
    });
    const dbString = JSON.stringify(db, null, 2);
    writeDB(dbval, dbString);
}

function checkForVals(dbval, table) {
    const db = getDB(dbval);
    return Object.prototype.hasOwnProperty.call(db, table);
}

function getTable(dbval, table) {
    const db = getDB(dbval);
    return db[table] || {};
}

export { createDB, getDB, writeDB, addValue, checkForVals, getTable };