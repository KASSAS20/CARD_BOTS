const sql = require('sqlite3').verbose();
const fs = require('fs');

// Функция только для добавления нового пользователя
function new_user(id,balance=0, cards = null, cases = null, friends = null){
    const db = new sql.Database('db/base.db');
    query = `INSERT INTO users (user_id, balance, cards, cases, friends)
                    VALUES (?,?,?,?,?)`;
    db.run(query, [id, balance, cards, cases, friends]);
    db.close();
}

// Изменения баланса(указываем изсенение, например: -200)
function edit_balance(id, edit){
    const db = new sql.Database('db/base.db');
    const query = `
        UPDATE users
        SET balance = ?
        WHERE user_id = ?
    `;
    get_attribute(id,'balance', function(err, balance){
    balance += edit;
    db.run(query, [balance, id])
    db.close();
});
}

// Получение значения атрибута
function get_attribute_user(id,attribute, callback){
    const db = new sql.Database('db/base.db');
    const query = `
        SELECT ${attribute}
        FROM users
        WHERE user_id = ?
    `;
    db.get(query, [id], function(err, row) {
        callback(null, row[`${attribute}`]);

        // Закрываем подключение к базе данных после выполнения запроса
        db.close();
    });
}
// перевод строки в массив
function format_list(list){
    list = list.replace(' ','').split(',')
    return list
}
// добавление элемента в массив значения атрибута
function add_atribute_user(id, list, attribute, edit){
    list = format_list(list)
    list.push(edit)
    list = list.join(',')
    const db = new sql.Database('db/base.db');
    const query = `
        UPDATE users
        SET ${attribute} = ?
        WHERE user_id = ?
    `;
    db.run(query, [list, id])
    db.close();
}


function new_card(id_card, name, rarity, price, file){
    const img  = fs.readFileSync(file);
    const db = new sql.Database('db/base.db');
    query = `INSERT INTO cards (card_id, name, rarity, price, file)
                    VALUES (?,?,?,?,?)`;
    db.run(query, [id_card, name, rarity, price, img]);
    db.close();
}

function get_file_from_card(id_card, callback){
    const db = new sql.Database('db/base.db');
    const query = `SELECT file FROM cards WHERE card_id = ?`;
    db.get(query, [id_card], (err, row) => {
        const buffer = Buffer.from(row.file, 'base64');
        callback(null, buffer);
    })
    db.close();
}


function writeToFile(data) {
    const filePath = 'test.png';

    // Открываем файл с флагом 'w' для записи (если файл не существует, он будет создан)
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка при записи в файл:', err);
        } else {
            console.log(`Данные успешно записаны в файл ${filePath}`);
        }
    });
}

// Пример использования функции


get_file_from_card(333, function(err, row){
    writeToFile(row);
    console.log(row)
})