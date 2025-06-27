import fs from 'node:fs';

function createDB() {
    fs.writeFileSync('db.json', '{}', (err) => {
        if (err) throw err;
        console.log('Created database!');
    });
}

function getDB() {
    if (!fs.existsSync("db.json")) {
        createDB();
    }
    try {
        const data = fs.readFileSync('db.json', 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (err) {
        console.error(err);
    }   
}

function writeDB(db) {
    fs.writeFile("db.json", db, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
}

function addValue(key, value) {
    let db = getDB();
    db[key] = value;
    const dbString = JSON.stringify(db)
    writeDB(dbString)
}

export { addValue };