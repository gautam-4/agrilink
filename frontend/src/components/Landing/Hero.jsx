import React from 'react';
import overlayImg from '@/assets/overlay.png';

function Hero() {
  return (
    <section className="hero flex flex-col lg:flex-row h-[90vh] relative">
      <div className="hero_overlay bg-secondary opacity-80 flex-1 lg:max-w-[450px] relative hidden sm:block">
        <img 
          src={overlayImg} 
          alt="" 
          className="absolute h-[720px] transform -rotate-10 -left-[50px] top-[30px] opacity-90 object-cover"
        />
      </div>
      <div className="hero_main flex-2 relative">
        <div className="hero_main-title title pt-[75px] pl-0 sm:pl-[80px] text-">
          Empowering Farmers Through Decentralization
        </div>
        <div className="hero_main-description mx-[90px] mt-[30px] text-[1.25em] font-[var(--font-three)] text-secondary hidden sm:block">
          Empowering farmers through decentralized solutions and sustainable practices. 
          Join us in revolutionizing agriculture for a brighter, more resilient future. 
          Together, let's cultivate abundance while nurturing our planet.
        </div>
        <div className="hero_main-caption absolute bottom-0 bg-[var(--accent-light)] w-full h-[120px] rounded-tr-[10px] p-[10px] ml-[5px] text-[1.08em] opacity-90  hidden sm:block">
          <p className="first-quote absolute left-[20px]">
            "Where Tradition Meets Innovation in Agriculture's Next Chapter."
          </p>
          <p className="second-quote absolute bottom-[40px] left-[130px]">
            "Every seed holds the promise of a thriving tomorrow."
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;