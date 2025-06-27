import fs from 'node:fs';

function createDB(db) {
    fs.writeFileSync(db, '{}', (err) => {
        if (err) throw err;
        console.log('Created database | ', db);
    });
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
    fs.writeFileSync(db, write, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
}

function addValue(dbval, values) {
    const db = getDB(dbval);
    for (let i = 0; i < values.length; i++) {
    const key = Object.keys(values[i])[0];
        const value = values[i][key];
        db[key] = value;
    }
    const dbString = JSON.stringify(db, null, 2);
    writeDB(dbval, dbString);
}

function checkForVals(dbval, values) {
    let choice;
    const db = getDB(dbval);
    for (let i = 0; i < values.length; i++) {
    const key = Object.keys(values[i])[0];
        const value = values[i][key];
        db[key] = value;
        if (key !== "" && choice !== false) {
            choice = true;
        } else {
            choice = false;
        }
    }
    return choice;
}

export { addValue, createDB, checkForVals };