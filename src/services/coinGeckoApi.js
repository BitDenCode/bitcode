import axios from "axios";

// Список топ-15 мемкойнов по ID на CoinGecko
const MEMECOIN_IDS = [
  "dogecoin",
  "shiba-inu",
  "pepe",
  "dogwifcoin",
  "floki",
  "bonk",
  "baby-doge-coin",
  "dogelon-mars",
  "wojak",
  "mog-coin",
  "turbo",
  "milady-meme-coin",
  "kabosu",
  "myro",
  "kitty-inu"
].join(",");

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

export const fetchMemecoins = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        vs_currency: 'usd',
        ids: MEMECOIN_IDS,
        order: 'market_cap_desc',
        price_change_percentage: '1h,24h',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке данных мемкойнов:', error);
    return [];
  }
};
