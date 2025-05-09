import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/logo2.svg';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coinData, setCoinData] = useState({
    BTC: { price: '-', change: '-', image: '' },
    ETH: { price: '-', change: '-', image: '' },
    SOL: { price: '-', change: '-', image: '' },
  });

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);

    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const fetchPricesAndIcons = async () => {
      try {
        const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

        // Получение цен с Bybit
        const bybitData = await Promise.all(
          symbols.map(symbol =>
            fetch(`https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}`)
              .then(res => res.json())
              .then(data => {
                const ticker = data.result.list[0];
                return {
                  symbol: symbol.slice(0, 3),
                  price: parseFloat(ticker.lastPrice).toFixed(2),
                  change: parseFloat(ticker.price24hPcnt * 100).toFixed(2),
                };
              })
          )
        );

        // Получение иконок с CoinGecko
        const coingeckoIds = ['bitcoin', 'ethereum', 'solana'];
        const coingeckoRes = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana'
        );
        const coingeckoData = await coingeckoRes.json();

        const iconMap = {};
        coingeckoData.forEach(item => {
          iconMap[item.symbol.toUpperCase()] = item.image;
        });

        const newCoinData = {};
        bybitData.forEach(({ symbol, price, change }) => {
          newCoinData[symbol] = {
            price,
            change,
            image: iconMap[symbol] || '',
          };
        });

        setCoinData(newCoinData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchPricesAndIcons();
    const interval = setInterval(fetchPricesAndIcons, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <div className="logo">          
            <a href="/">
              <img src={logo} alt="Logo" className="logo-img" />
              <span className="logo-text">MEMECOINS</span>
            </a>
          </div>

          

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a className="nav-btn" href="#about" onClick={(e) => handleLinkClick(e, '#about')}>Главная</a>
            <a className="nav-btn" href="#top-memecoins" onClick={(e) => handleLinkClick(e, '#top-memecoins')}>ТОП</a>
            <a className="nav-btn" href="#overview" onClick={(e) => handleLinkClick(e, '#overview')}>Обзор</a>
          </nav>

          <div className={`burger ${menuOpen ? 'toggle' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>

        <div className="price-ticker-wrapper">
          <div className="price-ticker-oval">
            <div className="ticker-text">
              {['BTC', 'ETH', 'SOL'].map((coin) => {
                const { price, change, image } = coinData[coin];
                const isUp = parseFloat(change) >= 0;
                const changeClass = isUp ? 'ticker-up' : 'ticker-down';
                return (
                  <span key={coin} className="ticker-item">
                    {image && <img src={image} alt={coin} className="coin-icon" />}
                    {coin}: ${price} <span className={changeClass}>({change}%)</span> &nbsp; | &nbsp;
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
};

export default Header;
