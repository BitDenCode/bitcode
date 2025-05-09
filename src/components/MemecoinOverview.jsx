import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MemecoinOverview.css";
import Icon from "./Icon";

const memecoins = [
  {
    name: "Dogecoin",
    description: "Dogecoin — один из первых мемкойнов, созданный в декабре 2013 года инженерами Билли Маркусом и Джексоном Палмером. Вдохновлена на популярном меме с собакой породы Шиба-ину. Проект поддерживается огромным сообществом и даже Илоном Маском. Используется для микротранзакций и благотворительности.",
    icon: "/public/icons/dogecoin.png",
    symbol: "DOGEUSD"
  },
  {
    name: "Shiba Inu",
    description: "Shiba Inu — токен в экосистеме Ethereum, провозглашённый 'убийцей Dogecoin', создан в августе 2020 года анонимным лицом под псевдонимом Ryoshi. Предлагает целую экосистему ShibaSwap, NFT и даже свой собственный блокчейн — Shibarium.",
    icon: "/public/icons/shibainu.png",
    symbol: "SHIBUSD"
  },
  {
    name: "Pepe",
    description: "Pepe — это мем-токен на базе Ethereum, созданный в апреле 2023 года и вдохновленный популярным интернет-мемом Pepe the Frog. Pepe не имеет официальной команды или дорожной карты, позиционируется как 'монета для людей', и быстро завоевал популярность среди любителей мемов и криптосообщества.",
    icon: "/public/icons/pepe.png",
    symbol: "PEPEUSD"
  },
  {
    name: "Floki",
    description: "Floki Inu — мемкойн, вдохновлённый собакой Илона Маска. Проект включает игровые метавселенные, NFT и образовательные платформы в рамках проекта 'Valhalla'.",
    icon: "/public/icons/floki.png",
    symbol: "FLOKIUSD"
  },
  {
    name: "Bonk",
    description: "Bonk — мемкойн на базе Solana, ориентированный на возрождение экосистемы Solana после падения FTX. Предлагает распределение токенов среди активных пользователей.",
    icon: "/public/icons/bonk.png",
    symbol: "BONKUSD"
  },
  {
    name: "Mog Coin",
    description: "Mog Coin — это мем-токен на блокчейне Ethereum, который появился в 2023 году и быстро стал популярен среди энтузиастов мем-культуры и криптовалютных инвесторов. Символом Mog Coin является персонаж Mog — мем-кот, известный в интернет-сообществах. Токен был создан без определённой утилитарности, как и большинство мем-коинов, но благодаря активности сообщества и поддержке инфлюенсеров его капитализация быстро выросла.",
    icon: "/public/icons/mogcoin.png",
    symbol: "MOGUSD"
  },
  {
    name: "Dogwifhat",
    description: "Dogwifhat (WIF) — мемкойн на блокчейне Solana. Главная особенность: весёлый образ собаки в шапке, который стал вирусным в криптосообществе.",
    icon: "/public/icons/dogwifhat.png",
    symbol: "WIFUSD"
  },
  {
    name: "Baby Doge Coin",
    description: "Baby Doge Coin — это мем-криптовалюта, запущенная в июне 2021 года на Binance Smart Chain (BSC). Она позиционируется как 'сын' или 'наследник' знаменитого Dogecoin. Baby Doge Coin фокусируется на быстроте транзакций и низких комиссиях, а также активно участвует в благотворительных инициативах для животных.",
    icon: "/public/icons/babydogecoin.png",
    symbol: "BABYDOGEUSD"
  },
  {
    name: "Dogelon Mars",
    description: "Dogelon Mars — мем-токен, названный в честь Илона Маска и его мечты о Марсе. Токен был создан в 2021 году на Ethereum и Polygon. Название и символика Dogelon Mars обыгрывают темы космоса, будущего и мем-культуры вокруг Dogecoin и Илона Маска.",
    icon: "/public/icons/dogelonmars.png",
    symbol: "ELONUSD"
  },
  {
    name: "Turbo",
    description: "Turbo — мемкойн, созданный с помощью искусственного интеллекта GPT-4, который смог привлечь внимание криптосообщества благодаря необычной концепции.",
    icon: "/public/icons/turbo.png",
    symbol: "TURBOUSD"
  },
  {
    name: "Milady Meme Coin",
    description: "Milady Meme Coin — мем-токен, связанный с известной NFT-коллекцией Milady Maker. Запущен в мае 2023 года на Ethereum. Основная идея — поддержка коммьюнити Milady Maker и развитие собственной мем-культуры вокруг NFT и крипто-сообщества.",
    icon: "/public/icons/miladymemecoin.png",
    symbol: "LADYSUSD"
  },
  {
    name: "Wojak",
    description: "Wojak — это мем-токен, основанный на известном интернет-меме Wojak (или Feels Guy), который символизирует различные эмоции, ситуации и переживания, часто используемые в крипто-комьюнити. Токен был запущен в 2023 году на Ethereum.",
    icon: "/public/icons/wojak.png",
    symbol: "WOJAKUSD"
  },
  {
    name: "Myro",
    description: "Myro — мемкойн, посвящённый собаке Рафаэля Якобо, главы разработчиков Solana. Проект также развивает экосистему в сети Solana.",
    icon: "/public/icons/myro.png",
    symbol: "MYROUSD"
  },
  {
    name: "Kitty Inu",
    description: "Kitty Inu — это мем-токен, вдохновленный мем-культурой и популярностью “собачьих” коинов, таких как Dogecoin и Shiba Inu, но с акцентом на кошек. Проект стартовал в 2021 году на блокчейне Ethereum, а позже был добавлен и в Binance Smart Chain (BSC). Kitty Inu стремится объединить криптоэнтузиастов вокруг идеи мемов, игр и NFT.",
    icon: "/public/icons/kittyinu.png",
    symbol: "kittyUSD"
  },
  {
    name: "Kabosu",
    description: "Kabosu — мем-токен, названный в честь настоящей собаки по кличке Кабосу, которая стала лицом оригинального мема 'Doge' и вдохновила создание Dogecoin. Запущен в 2021 году на Ethereum. Проект направлен на поддержку благотворительных инициатив, связанных с животными, и развитие мем-культуры.",
    icon: "/public/icons/kabosu.png",
    symbol: "KABOSUUSD"
  },
];

const MemecoinOverview = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleChart = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="overview" className="memecoin-overview">
      <h2>Обзор ТОП-15 Мемкойнов</h2>
      <div className="memecoin-list">
        {memecoins.map((coin, index) => (
          <motion.div
            key={index}
            className="memecoin-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            
            <div className="memecoin-header">
                <Icon name={coin.name} size={40} />
                <h3>{coin.name}</h3>
            </div>
            <p>{coin.description}</p>
            <button onClick={() => toggleChart(index)}>
              {activeIndex === index ? "Скрыть график" : "Показать график"}
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="chart-container"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="tradingview-widget-container">
                    <iframe
                      src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_b9f11&symbol=CRYPTO%3A${coin.symbol}&interval=1H&theme=dark&style=1&locale=ru`}
                      width="100%"
                      height="400"
                      frameBorder="0"
                      allowTransparency="true"
                      scrolling="no"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MemecoinOverview;
