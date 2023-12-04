const sql = require('sqlite3').verbose();


// Функция только для добавления нового пользователя
function new_user(id,balance=0, cards = null, cases = null, friends = null){
    const db = new sql.Database('db/base.db');
    query = `INSERT INTO users (user_id, balance, cards, cases, friends)
                    VALUES (?,?,?,?,?)`;
    db.run(query, [id, balance, cards, cases, friends]);
    db.close();
}

function get_balance(id, callback){
    const db = new sql.Database('db/base.db');
    const query = `
        SELECT balance
        FROM users
        WHERE user_id = ?
    `;
    db.get(query, [id], function(row) {
        if (row) {
            callback(null, row.balance);
        } else {
            callback(null, null);
        }

        // Закрываем подключение к базе данных после выполнения запроса
        db.close();
    });
    
}


get_balance(335,function(balance){
    console.log(balance)
});





// function edit_balance(id, edit){
//     const db = new sql.Database('db/base.db');
//     const query = `
//         UPDATE users
//         SET balance = ?
//         WHERE user_id = ?
//     `;
//     db.run(query, [])
    
// }