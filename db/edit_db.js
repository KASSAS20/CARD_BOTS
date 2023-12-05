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
function new_card(id_card, name, rarity, price, file){
    const img  = fs.readFileSync(file);
    const db = new sql.Database(db_path);
    query = `INSERT INTO cards (card_id, name, rarity, price, file)
                    VALUES (?,?,?,?,?)`;
    db.run(query, [id_card, name, rarity, price, img]);
    db.close();
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


// Изменения баланса(указываем изсенение, например: -200)
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

