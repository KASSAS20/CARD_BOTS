const db = require('../db/edit_db.js')
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const token = '6981900970:AAE8rDSIM46MDoLfK5I1f19QXreWmf9nDNE';

let bot = new TelegramBot(token, { polling: true });

bot.onText(/\/get_image_cards (.+)/, function (msg, match) {
    let fromId = msg.from.id;
    let resp = match[1];
    db.get_file_from_card(resp, function (_, row) {
        bot.sendPhoto(fromId, row)
    })
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.photo && msg.caption == '/new_card') {
        const photo = msg.photo;
        const fileId = photo[photo.length - 1].file_id;
        bot.downloadFile(fileId, 'admin/img',(error, filePath) => {
                fs.readdir('admin/img', (_, files) => {
                    console.log(files);
                })})}})
