const sql = require('sqlite3').verbose();


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
function get_attribute(id,attribute, callback){
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
// добавление элемента в массив значения функции
function add_atribute(id, list, attribute, edit){
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
// get_attribute(333,'friends', function(err, row){
//     let list = row
//     add_atribute(333,list, 'friends', '3')
// })
