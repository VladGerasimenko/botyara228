const api = require('node-telegram-bot-api')
const FullNameValidator = require('./utils/validators/FullNameValidator')
const PassportDigitsValidator = require('./utils/validators/PassportDigitsValidator')
const BirthDateValidator = require('./utils/validators/BirthDateValidator')
const TOKEN = '1814335367:AAHBjpedTx2FO5b-nlgJfBO-NgI53SYUlHk'
const bot = new api(TOKEN, {polling: true})
const answerCallbacks = {}

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию'}
])

bot.on("message", async function (msg) {
    const text = msg.text
    const chatId = msg.chat.id
    const callbackObj = answerCallbacks[chatId];
    if (callbackObj) {
        const validator = answerCallbacks[chatId].validator
        const callbackFn = answerCallbacks[chatId].callback
        if (validator.validate(text)) {
            delete answerCallbacks[chatId];
            return callbackFn(msg);
        } else {
            await bot.sendMessage(chatId, validator.getValidationMessage())
        }
    } else {
        switch (text) {
            case '/info':
                await bot.sendMessage(chatId, 'Информация по созданию QR кода')
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/436/eca/436ecaef-3edc-4a3f-83d7-e0306564f827/10.webp')
                break
            case '/start':
                await getData(msg)
                break
            default:
                await bot.sendMessage(chatId, 'Пожалуйста введите одну из доступных комманд')
        }
    }
});

function getData(message) {
    bot.sendMessage(message.chat.id, 'Добро пожаловать в бота по созданию QR кода').then(() => {
        bot.sendSticker(message.chat.id, 'https://tlgrm.ru/_/stickers/436/eca/436ecaef-3edc-4a3f-83d7-e0306564f827/12.webp').then(() => {
            bot.sendMessage(message.chat.id, "Please enter your full name").then(function () {
                answerCallbacks[message.chat.id] = {
                    validator: FullNameValidator,
                    callback: function (answer) {
                        let name = answer.text;
                        bot.sendMessage(message.chat.id, "Please enter two first character and three last characters of passport").then(function () {
                            answerCallbacks[message.chat.id] = {
                                validator: PassportDigitsValidator,
                                callback: function (answer) {
                                    let passportDigits = answer.text;
                                    bot.sendMessage(message.chat.id, "Please enter your birth date").then(function () {
                                        answerCallbacks[message.chat.id] = {
                                            validator: BirthDateValidator,
                                            callback: async function (answer) {
                                                let birthDate = answer.text;
                                                await bot.sendMessage(message.chat.id, name + passportDigits + birthDate + " saved!");
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        });
    });
}
