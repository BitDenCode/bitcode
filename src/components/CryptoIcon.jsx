import React, { useEffect, useState } from 'react';
import './CryptoIcon.css';

const COINGECKO_LIST_URL = 'https://api.coingecko.com/api/v3/coins/list';
const COINGECKO_COIN_URL = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;

const symbolCache = {}; // кэш { BTC: { id, name, image } }

const CryptoIcon = ({ symbol, size = 32 }) => {
  const [iconUrl, setIconUrl] = useState(null);
  const [hasError, setHasError] = useState(false);

  const fetchIcon = async () => {
    const baseSymbol = extractBaseSymbol(symbol);

    if (symbolCache[baseSymbol]) {
      setIconUrl(symbolCache[baseSymbol].image);
      return;
    }

    try {
      const listRes = await fetch(COINGECKO_LIST_URL);
      const coinList = await listRes.json();

      const found = coinList.find(
        (c) => c.symbol.toLowerCase() === baseSymbol.toLowerCase()
      );

      if (!found) {
        setHasError(true);
        return;
      }

      const coinRes = await fetch(COINGECKO_COIN_URL(found.id));
      const coinData = await coinRes.json();

      symbolCache[baseSymbol] = {
        id: found.id,
        name: coinData.name,
        image: coinData.image.small,
      };

      setIconUrl(coinData.image.small);
    } catch (err) {
      console.error('Icon load error:', err);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchIcon();
  }, [symbol]);

  if (hasError) return <div style={{ width: size, height: size }}>🚫</div>;
  if (!iconUrl) return <div className="crypto-icon-skeleton" style={{ width: size, height: size }} />;

  return (
    <img
      src={iconUrl}
      alt={symbol}
      width={size}
      height={size}
      style={{ borderRadius: '50%' }}
      loading="lazy"
    />
  );
};

const extractBaseSymbol = (symbol) => {
  const knownQuotes = ['USDT', 'USD', 'BTC', 'ETH', 'BNB'];
  for (const q of knownQuotes) {
    if (symbol.toUpperCase().endsWith(q)) {
      return symbol.toUpperCase().replace(q, '');
    }
  }
  return symbol.toUpperCase();
};

export default CryptoIcon;

