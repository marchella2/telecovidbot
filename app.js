const { Telegraf } = require('telegraf')
const axios = require('axios')
const dateFormat = require('dateformat')

const bot = new Telegraf('1661413813:AAGc1hp5JSGlhqVX68pLgABp1WZ9YkND0Is')

bot.start((ctx) => {
    let message = `Hai, ${ctx.from.first_name}. Selamat datang di bot Informasi Covid-19`
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Indonesia 🇮🇩', callback_data: 'indonesia'}],
                [{ text: 'Seluruh dunia 🌏', callback_data: 'world'}],
            ]
        }
    });
})

bot.action('indonesia', (ctx) => {
    ctx.answerCbQuery('Mohon tunggu sebentar')
    let getData = async() => {
        try {
            const res = await axios.get(`https://disease.sh/v3/covid-19/countries/Indonesia`)
            // console.log(res.data)
            let date = dateFormat(res.data.updated, "dddd, d mmmm yyyy, h:MM:ss TT")
            let cases = res.data.cases
            let todayCase = res.data.todayCases
            let totalActive = res.data.active
            let todayRecovered = res.data.todayRecovered
            let totalRecovered = res.data.recovered
            let todayDeath = res.data.todayDeaths
            let totalDeath = res.data.deaths

            let table = `
Status Covid-19 di Indonesia
Tanggal : ${date}

<pre>
---------------------------------------
| Total Kasus   |   ${cases}    |
---------------------------------------
| Kasus Hari Ini   |   ${todayCase}    |
---------------------------------------
| Total Kasus Positif   |   ${totalActive}    |
---------------------------------------
| Kasus Sembuh Hari Ini   |   ${todayRecovered}    |
----------------------------------------
| Total Kasus Sembuh |   ${totalRecovered}    |
----------------------------------------
| Kasus Meninggal Hari Ini |   ${todayDeath}    |
----------------------------------------
| Total Kasus Meninggal |   ${totalRecovered}    |
----------------------------------------
</pre>
            `

            bot.telegram.sendMessage(ctx.chat.id, table, {
                parse_mode: 'HTML'
            });
        } catch (error) {
            console.error('error' + error)
        }
    }

    getData();
})

bot.action('world', (ctx) => {
    ctx.answerCbQuery('Mohon tunggu sebentar')
    let getData = async() => {
        try {
            const res = await axios.get(`https://disease.sh/v3/covid-19/countries/Indonesia`)
            // console.log(res.data)
            let date = dateFormat(res.data.updated, "dddd, d mmmm yyyy, h:MM:ss TT")
            let cases = res.data.cases
            let todayCase = res.data.todayCases
            let totalActive = res.data.active
            let todayRecovered = res.data.todayRecovered
            let totalRecovered = res.data.recovered
            let todayDeath = res.data.todayDeaths
            let totalDeath = res.data.deaths

            let table = `
Status Covid-19 di Indonesia
Tanggal : ${date}

<pre>
---------------------------------------
| Total Kasus   |   ${cases}    |
---------------------------------------
| Kasus Hari Ini   |   ${todayCase}    |
---------------------------------------
| Total Kasus Positif   |   ${totalActive}    |
---------------------------------------
| Kasus Sembuh Hari Ini   |   ${todayRecovered}    |
----------------------------------------
| Total Kasus Sembuh |   ${totalRecovered}    |
----------------------------------------
| Kasus Meninggal Hari Ini |   ${todayDeath}    |
----------------------------------------
| Total Kasus Meninggal |   ${totalRecovered}    |
----------------------------------------
</pre>
            `

            bot.telegram.sendMessage(ctx.chat.id, table, {
                parse_mode: 'HTML'
            });
        } catch (error) {
            console.error('error' + error)
        }
    }

    getData();
})

bot.launch();