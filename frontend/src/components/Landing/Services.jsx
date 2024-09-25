import React, { useState, useEffect } from 'react';
import marketImg from '@/assets/marketplace2.png'
import aiFarmImg from '@/assets/aifarm.png'
import insuranceImg from '@/assets/insurance.png'

function Services() {
  const [highlightedCard, setHighlightedCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedCard((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="services" id="services">
      <div className="services_left">
        <div className="services_left-frame hidden sm:block" data-aos="fade-right">
          <img src={highlightedCard==0?insuranceImg:(highlightedCard===1?aiFarmImg:marketImg)} alt="" />
        </div>
        <div className="services_left-title">
          {highlightedCard === 0 && <div className="title one" data-aos="fade-right">Crowdsourced Insurance</div>}
          {highlightedCard === 1 && <div className="title two" data-aos="fade-right">AI farming assistant</div>}
          {highlightedCard === 2 && <div className="title three" data-aos="fade-right">Agricultural Marketplace</div>}
        </div>
      </div>
      <div className="services_right hidden sm:block">
        <div className="services_right-description" data-aos="fade-left">
          {highlightedCard === 0 && <div className="one" data-aos="fade-left">Farmers can secure their harvest by using our decentralized insurance pool, where blockchain ensures fair payouts and solidarity among farmers. Farmers no longer have to rely on insurance companies playing fair.</div>}
          {highlightedCard === 1 && <div className="two" data-aos="fade-left">Our technology merges the wisdom of farmers with the power of AI, delivering personalized insights and real-time support. AI crop monitoring predicts yields and detects issues early, ensuring bountiful harvests and peace of mind for farmers.</div>}
          {highlightedCard === 2 && <div className="three" data-aos="fade-left">Sow, grow, and sell with confidence. Blockchain marketplace connects farmers directly with buyers, ensuring secure and transparent transactions. This allows consumers to support their local farmers and helps build a strong sense of community locally.</div>}
        </div>
        <div className="services_right-container" data-aos="fade-left">
          <div className={`card ${highlightedCard === 0 && 'highlight'}`}>
          <img src={insuranceImg} alt="" />
          </div>
          <div className={`card ${highlightedCard === 1 && 'highlight'}`}>
            <img src={aiFarmImg} alt="" />
          </div>
          <div className={`card ${highlightedCard === 2 && 'highlight'}`}>
            <img src={marketImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services