import React from 'react';
import { Layout } from 'antd';
import './promo.css';

function PromoPage() {
  return (
    <Layout className="promo_wrapper">
      <div className="promo_description">
        <h1>О приложении</h1>
        <p>RSLang - это приложение для эффективного изучения английского.</p>
        <p>Список его преимуществ перед аналогами:</p>
        <ul>
          <li>Словарь, который постоянно пополняется новыми словами в процессе изучения</li>
          <li>
            Мини-игры:
            <ul>
              <li>Скажи это</li>
              <li>Саванна</li>
              <li>Спринт</li>
              <li>Головоломка</li>
              <li>Аудиовызов</li>
            </ul>
          </li>
          <li>Используется методика интервальных повторений</li>
          <li>Имеется краткосрочная и долгосрочная статистика по итогу каждой игры</li>
          <li>Возможность настроить под себя количество изучаемых слов за день </li>
          <li>Широкие настройки карточек слов</li>
        </ul>
      </div>
      <div className="promo__video">
        <iframe
          title="Promo video content for RS Lang"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/VSW7cSMdKiA"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Layout>
  );
}

export default PromoPage;
