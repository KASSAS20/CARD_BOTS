const sql = require('sqlite3').verbose();
const fs = require('fs');
const db_path = 'db/base.db'


// Функция только для добавления нового пользователя
function new_user(id,balance=0, cards = null, cases = null, friends = null){
    const db = new sql.Database(db_path);
    query = `INSERT INTO users (user_id, balance, cards, cases, friends)
    VALUES (?,?,?,?,?)`;
    db.run(query, [id, balance, cards, cases, friends]);
    db.close();
}


//создание новой карточки
function new_card(name, rarity, price, file){
    const img  = fs.readFileSync(file);
    const db = new sql.Database(db_path);
    query = `SELECT MAX(card_id) AS last_unique_key FROM cards`;
    db.get(query, [], (_, row) => {
        id_card = row.last_unique_key
        if (id_card == null){
            id_card = 0
        }
        id_card+=1
        query = `INSERT INTO cards (card_id, name, rarity, price, file)
                    VALUES (?,?,?,?,?)`;
        db.run(query, [id_card, name, rarity, price, img]);
        db.close();})
}


//создание кейса
function new_case(id,name, price, rarity, file){
    const img  = fs.readFileSync(file);
    const db = new sql.Database(db_path);
    query = `INSERT INTO cases (case_id, name, rarity, price, file)
    VALUES (?,?,?,?,?)`;
    db.run(query, [id, name, rarity, price, img]);
    db.close();
}


// удаление пользователя
function remove_user(id){
    const db = new sql.Database(db_path);
    query = `DELETE FROM users WHERE user_id = ?;`
    db.run(query, [id])
    db.close()
}


// удаление карточки
function remove_card(id){
    const db = new sql.Database(db_path);
    query = `DELETE FROM cards WHERE card_id = ?;`
    db.run(query, [id])
    db.close()
}


// удаление кейса
function remove_case(id){
    const db = new sql.Database(db_path);
    query = `DELETE FROM cases WHERE case_id = ?;`
    db.run(query, [id])
    db.close()
}


// Получение  атрибута из пользователя
function get_attribute_user(id,attribute, callback){
    const db = new sql.Database(db_path);
    const query = `
        SELECT ${attribute}
        FROM users
        WHERE user_id = ?
    `;
    db.get(query, [id], function(err, row) {
        callback(null, row[`${attribute}`]);
        db.close();
    });
}


// Изменения баланса(указываем изменение, например: -200)
function edit_balance(id, edit){
    const db = new sql.Database(db_path);
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


//получение атрибута из карточки
function get_attribute_card(id, attribute,callback){
    const db = new sql.Database(db_path);
    const query = `
    SELECT ${attribute}
    FROM cards
    WHERE card_id = ?
    `;    
    db.get(query, [id], function(err, row) {
        callback(null, row[`${attribute}`]);
        db.close();
    });        
}        

// получение изображения карточки
function get_file_from_card(id_card, callback){
    const db = new sql.Database(db_path);
    const query = `SELECT file FROM cards WHERE card_id = ?`;
    db.get(query, [id_card], (err, row) => {
        const buffer = Buffer.from(row.file, 'base64');
        callback(null, buffer);
    })
    db.close();
}

//получение изображения кейса
function get_file_from_case(id, callback){
    const db = new sql.Database(db_path);
    const query = `SELECT file FROM cases WHERE case_id = ?`;
    db.get(query, [id], (err, row) => {
        const buffer = Buffer.from(row.file, 'base64');
        callback(null, buffer);
    })
    db.close();
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
    const db = new sql.Database(db_path);
    const query = `
    UPDATE users
    SET ${attribute} = ?
    WHERE user_id = ?
    `;    
    db.run(query, [list, id])
    db.close();
}        

module.exports.add_atribute_user = add_atribute_user;
module.exports.new_user = new_user;
module.exports.new_card = new_card;
module.exports.new_case = new_case;
module.exports.remove_user = remove_user;
module.exports.remove_card = remove_card;
module.exports.remove_case = remove_case;
module.exports.remove_user = remove_user;
module.exports.get_attribute_user = get_attribute_user;
module.exports.get_attribute_card = get_attribute_card;
module.exports.get_file_from_card = get_file_from_card;
module.exports.get_file_from_case = get_file_from_case;
module.exports.edit_balance = edit_balance;


// new_card('a', 'e', 200, 'db/003.png')