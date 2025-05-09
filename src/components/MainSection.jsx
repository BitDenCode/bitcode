import React from 'react';
import './MainSection.css';

const MainSection = () => {
  return (
    <section id="about" className="main-section">
      <div className="text-content">
        <h1>Добро пожаловать на MEMECOINS!</h1>
        <p>
          Мы собрали лучшие мемкойны с самой высокой капитализацией на крипторынке.
          Вы найдёте детальную информацию о каждой монете, её особенностях, истории создания и причинах популярности. 
          От классических лидеров до новых звёзд — узнайте, какие мем-токены сегодня задают тренды, привлекают миллионы инвесторов и формируют будущее мира цифровых активов. 
          Узнайте, какие монеты правят миром криптовалют прямо сейчас!
        </p>
      </div>
      <div className="image-content">
        <img src="/public/icons/floks.png" alt="Memecoins" />
      </div>
    </section>
  );
};

export default MainSection;
