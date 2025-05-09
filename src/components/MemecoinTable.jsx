import React, { useEffect, useState } from "react";
import { fetchMemecoins } from "../services/coinGeckoApi";
import { motion } from 'framer-motion';
import './MemecoinTable.css';

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [openChartCoin, setOpenChartCoin] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [sortBy, setSortBy] = useState("market_cap");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMemecoins();
      setCoins(data);
    };
    getData();
  }, []);

  useEffect(() => {
    document.documentElement.className = isDarkTheme ? '' : 'light-theme';
  }, [isDarkTheme]);

  const handleToggleChart = (coinId) => {
    setOpenChartCoin(openChartCoin === coinId ? null : coinId);
  };

  const getTradingViewSymbol = (coin) => {
    return `${coin.symbol.toUpperCase()}USDT`;
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const filteredCoins = coins.filter((coin) => {
    if (filter === "positive") return coin.price_change_percentage_24h_in_currency > 0;
    if (filter === "negative") return coin.price_change_percentage_24h_in_currency < 0;
    return true;
  });

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    switch (sortBy) {
      case "market_cap":
        return b.market_cap - a.market_cap;
      case "change_1h":
        return b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency;
      case "change_24h":
        return b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency;
      default:
        return 0;
    }
  });

  return (
    <div id="top-memecoins" className="page-container">

      <motion.div
        className="table-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

      <h2 className="table-title">ТОП-15 мемкойнов по капитализации</h2>

      <div className="controls">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="market_cap">Сортировать по капитализации</option>
          <option value="change_1h">Сортировать по изменению за 1ч</option>
          <option value="change_24h">Сортировать по изменению за 24ч</option>
        </select>

        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">Показать все</option>
          <option value="positive">Только растущие</option>
          <option value="negative">Только падающие</option>
        </select>
      </div>  
        <table className="memecoin-table">
          <thead>
            <tr>
              <th>Монета</th>
              <th>Цена</th>
              <th>Изм. 1ч</th>
              <th>Изм. 24ч</th>
              <th>Капитализация</th>
              <th>График</th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins.map((coin) => (
              <React.Fragment key={coin.id}>
                <tr>
                  <td className="coin-info-cell">
                    <img src={coin.image} alt={coin.name} width="30" height="30"/>
                    <span className="coin-name">{coin.name}</span>
                  </td>
                  <td>${coin.current_price.toFixed(8)}</td>
                  <td style={{ color: coin.price_change_percentage_1h_in_currency > 0 ? "lime" : "red" }}>
                    {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </td>
                  <td style={{ color: coin.price_change_percentage_24h_in_currency > 0 ? "lime" : "red" }}>
                    {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                  <td>
                    <button className="chart-button" onClick={() => handleToggleChart(coin.id)}>
                      {openChartCoin === coin.id ? "Скрыть график" : "Показать график"}
                    </button>
                  </td>
                </tr>

                {openChartCoin === coin.id && (
                  <tr>
                    <td colSpan="6">
                      <div className="chart-container">
                        <iframe
                          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${coin.id}&symbol=BINANCE:${getTradingViewSymbol(coin)}&interval=30&hidesidetoolbar=1&theme=${isDarkTheme ? "dark" : "light"}&style=1&timezone=Etc/UTC&studies=[]`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allowTransparency="true"
                          scrolling="no"
                          title={`${coin.name} Chart`}
                        ></iframe>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </motion.div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkTheme ? "🌞" : "🌙"}
      </button>
    </div>
  );
};

export default CoinTable;
