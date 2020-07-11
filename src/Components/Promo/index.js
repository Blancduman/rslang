import React from 'react';
import { Layout } from 'antd';
import './promo.css';

function PromoPage() {
  return (
    <Layout className="promo_wrapper">
      <div className="promo_description">
        <h1>О приложении</h1>
        <p>О приложении</p>
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
