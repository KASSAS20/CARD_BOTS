const sql = require('sqlite3').verbose();


let url = 'CARD_BOTS/db/base.db'

// Функция только для добавления нового пользователя
function new_user(id,balance=0, cards = null, cases = null, friends = null){
    const db = new sql.Database(url);
    query = `INSERT INTO users (user_id, balance, cards, cases, friends)
                    VALUES (?,?,?,?,?)`;
    db.run(query, [id, balance, cards, cases, friends]);
    db.close();
}

// Изменения баланса(указываем изсенение, например: -200)
function edit_balance(id, edit){
    const db = new sql.Database(url);
    const query = `
        UPDATE users
        SET balance = ?
        WHERE user_id = ?
    `;
    get_attribute(id,'balance').then(({balance}) => {
        balance += edit;
        db.run(query, [balance, id])
        db.close();
    })

}

// Получение значения атрибута
// // перевод строки в массив
// function format_list(list){
//     list = list.replace(' ','').split(',')
//     return list
// }
// добавление элемента в массив значения функции


function add_atribute(id, list, attribute, edit){
    list = list.replace(' ', '').split(',')
    list.push(edit)
    list = list.join(',')
    const db = new sql.Database(url);
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


async function get_attribute(id, attribute) {
    return new Promise((resolve, reject) => {
        const db = new sql.Database(url);
        const query = `
        SELECT ${attribute}
        FROM users
        WHERE user_id = ?
    `;

        db.get(query, [id], function (err, row) {
            if (err) {
                reject(`${err}`)
            }
            resolve(row)
        });
        // Закрываем подключение к базе данных после выполнения запроса
        db.close();
    });
    
    
}

async function getArr(id, attribute){
    let result = await get_attribute(id, attribute)
    return result
}

module.exports.get_attribute = getArr
module.exports.new_user = new_user
module.exports.edit_balance = edit_balance
module.exports.add_atribute = add_atribute


// getArr(23, 'cards').then(res => console.log(res));

