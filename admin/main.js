const db = require('../db/edit_db.js')
const admin_token = require('./key.js')
const fs = require('fs');

const TelegramBot = require('node-telegram-bot-api');
const token = admin_token.token

let bot = new TelegramBot(token, { polling: true });

bot.onText(/\/get_image_cards (.+)/, function (msg, match) {
    let fromId = msg.from.id;
    let resp = match[1];
    db.get_file_from_card(resp, function (_, row) {
        bot.sendPhoto(fromId, row)
    })
});

bot.on('message', async (msg) => {
    // const chatId = msg.chat.id;
    try{
        list_arg = msg.caption.split(' ')
    } catch{
        list_arg = msg.text.split(' ')
    }
    // new_card command
    if (msg.photo && list_arg[0] == '/new_card') {
        const photo = msg.photo;
        const fileId = photo[photo.length - 1].file_id;
        await bot.downloadFile(fileId, 'admin/img')
        await bot.getFile(fileId).then((fileInfo) => {
            const fileName = fileInfo.file_path.split('/').pop()
            db.new_card(list_arg[1], list_arg[2], list_arg[3], `admin/img/${fileName}`)
            fs.unlink(`admin/img/${fileName}`, (err) => { ; })
        })
    } else if (msg.photo && list_arg[0] == '/new_case') {
        const photo = msg.photo;
        const fileId = photo[photo.length - 1].file_id;
        await bot.downloadFile(fileId, 'admin/img')
        await bot.getFile(fileId).then((fileInfo) => {
            const fileName = fileInfo.file_path.split('/').pop()
            db.new_case(list_arg[1], list_arg[2], list_arg[3], `admin/img/${fileName}`)
            fs.unlink(`admin/img/${fileName}`, (err) => { ; })
        })
    } else if (list_arg[0] == '/add'){
// add_atribute(table,id, list, attribute, edit)
        db.add_atribute(list_arg[1], list_arg[2], list_arg[3], list_arg[4])
    } else if(list_arg[0] == '/balance'){
        db.edit_balance(list_arg[1], list_arg[2])
    }
})
