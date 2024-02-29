
import TelegramBot from "node-telegram-bot-api";
//const testKey = "6469a721bede21a8ed89";
import stripe from "stripe";


//import axios from "axios";


const botToken = "6985342414:AAFxpkOhbpnMLBgpI_j9AX_jrHIuNwQrmug";
//const chatId = "1227459883";
const webAppUrl = "https://biznewschannel.com/";
//const webAppUrl2 = "https://biznewschannel.com/good";
const bot = new TelegramBot(botToken, { polling: true });


bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      `<i>Вас приветствует</i> <b>SettingNewsBot - бот для постинга</b><i> последних новостей ,публикаций и статей </i> <b><a href="https://biznewschannel.com/video">подробнее на сайте</a></b>`,
      {
        parse_mode: "HTML",
        reply_markup: {
          keyboard: [
            [
             

              { text: "🌐 Оплата криптой" },
              { text: "📰 Постинг", web_app: { url: webAppUrl } },
            ],

            [{ text: "Закрыть" }],
          ],
        },
      }
    );
  }
});

//STRIPE

const STRIPE_SECRET_KEY = "sk_test_51OazU7CEAUiVgq2v9f36loao1miREJDYbgb7nrsoQkm7wyO7irQqNU0j6STMvM8D5oF2HkSralI1SyfcbfNgRJ9X00vvJkSUO1";
const stripeInstance = stripe(STRIPE_SECRET_KEY);

//const payment_token = "5334985814:TEST:551862";

//STRIPE STARDANT
bot.onText(/\/paystandart/, async (msg) => {
  const chatId = msg.chat.id;

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Product Name",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://biznewschannel.com/good",
    cancel_url: "https://biznewschannel.com/no",
  });

  bot.sendMessage(
    chatId,
    `<i>Оплатите пакет</i> <b>Cтандарт</b> <i>по следующей ссылке:</i>${session.url}`,
    { parse_mode: "HTML" }
  );
});
//STRIPE BUSINESS
bot.onText(/\/paybusiness/, async (msg) => {
  const chatId = msg.chat.id;

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Product Name",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://biznewschannel.com/good",
    cancel_url: "https://biznewschannel.com/no",
  });

  bot.sendMessage(
    chatId,
    `<i>Оплатите пакет</i> <b>Бизнес</> <i>по следующей ссылке:</i>${session.url}`,
    { parse_mode: "HTML" }
  );
});
//STRIPE PREMIUM
bot.onText(/\/paypremium/, async (msg) => {
  const chatId = msg.chat.id;

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Product Name",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://biznewschannel.com/good",
    cancel_url: "https://biznewschannel.com/no",
  });

  bot.sendMessage(
    chatId,
    `<i>Оплатите пакет </i><b>Премиум</b><i> по следующей ссылке:</i>${session.url}`,
    { parse_mode: "HTML" }
  );
});

bot.startPolling();
