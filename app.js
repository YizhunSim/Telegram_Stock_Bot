"use strict";
// const { Telegraf } = require("telegraf");
import { Telegraf } from 'telegraf';

// const fetch = require("node-fetch");
import fetch from 'node-fetch';

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello from Node, from inside a docker container...</h1>");
  });

  app.listen(8080, () => {
    console.log("App running on port 8080...");
  });

console.log(`Logging Kubernetes configMap: ${process.env.log}`);
console.log(`Logging Kubernetes configMap: ${process.env.something}`);
console.log(`Logging Kubernetes Secrets: ${process.env.TELEGRAM_API_KEY}`);
console.log(`Logging Kubernetes Secrets: ${process.env.ALPHAVANTAGE_API_KEY}`);

// Change the 'insert bot API token here' with your Telegram Bot API Token that you received when you created new bot in @BotSupport
const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
// Change the 'demo' value below with AlphaVantage API Token received when you requested the free API access in AlphaVantage
let url =`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&interval=5min&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
bot.command("start", (ctx) => {
   console.log(ctx.from);
   bot.telegram.sendMessage(
   ctx.chat.id,
   "Hello to your own Telegram StockPrice bot. Please input your desired ticker symbol, for example .GOOG or .AAPL."
   );
});
bot.hears(/([.])\w{0,4}/, async (ctx) => {
let final_uri = url + `&symbol=${ctx.message.text.substring(1)}`;
console.log(`Final Url: ${final_uri}`);

fetch(final_uri)
    .then((response) => response.json())
    .then((data) => {
        console.log(`Data: ${JSON.stringify(data)}`);
        const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
        console.log(`last refreshed date: ${lastRefreshed}`);
         ctx.reply( "The stock price of " +
         data["Meta Data"]["2. Symbol"] +
         " as for today is " +
         parseFloat(
               data["Time Series (Daily)"]
                   [lastRefreshed]
                   // if the code is showing error then you can change ["4. close"] with ["1. open"] so it would works
                   ["4. close"]) +
         " USD"
         );
     });
});
bot.launch();