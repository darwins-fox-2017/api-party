const TelegramBot = require('node-telegram-bot-api')
var airbnb = require('airapi')
require('dotenv').config()

module.exports = {
  getBot: function (req, res, next) {
    res.send('Running Telegram Bot')

    const token = process.env.TELEGRAM_TOKEN
    const bot = new TelegramBot(token, {polling: true})

    bot.onText(/\/start/, function (message) {
      bot.sendMessage(message.chat.id, `Halo ${message.from.first_name} ${message.from.last_name}
      Selamat datang di
      *LIKILUK HOMESTAY BOT*
      ketik:

      /start : untuk memulai bot
      /test : testing bot
      /location <location name> : menentukan lokasi penginapan
      /murah <location name> : tempat penginapan termurah di suatu daerah`)
    })

    bot.onText(/\/murah (.+)/, (msg, match) => {
      const chatId = msg.chat.id
      const resp = match[1]

      airbnb.search({
        location: resp,
        guests: 2,
        ib: true
      }).then(function (searchResults) {
        let result = searchResults.results_json.search_results
        let newArr = []
        for (let i = 0; i < result.length; i++) {
          newArr.push(searchResults.results_json.search_results[i].pricing_quote.rate.amount)
        }
        let price = newArr.sort()
        let price_min = price[0]
        let price_max = price[0] + 500000
        let message = `http:// www.airbnb.co.id/s/${resp}?price_min=${price_min}&price_max=${price_max}`
        bot.sendMessage(chatId, message)
      })
    })

    bot.onText(/\/location (.+)/, (msg, match) => {
      const chatId = msg.chat.id
      const resp = match[1]
      console.log(resp)
      let message = `https:// www.airbnb.co.id/s/${resp}?page=1&s_tag=OcTV_qGZ&allow_override%5B%5D=`
      bot.sendMessage(chatId, message)
    })

    bot.onText(/\/test/, function (message) {
      bot.sendMessage(message.chat.id, `Test dari ${message.from.first_name} ${message.from.last_name} diterima`)
    })
  }
}
