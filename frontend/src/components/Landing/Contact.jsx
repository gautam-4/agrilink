import React, { useEffect } from 'react';
import pfp from '../assets/pfp.png'

function Contact() {
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section className="contact" id="contact">
                <div className="contact_heading" data-aos="flip-up">Contact</div>
                <div className="contact_container" data-aos="fade-up">
                    <div className="contact_container-names">
                        <div className="team-name">Error Overflow</div>
                    </div>
                    <div id="carousel" data-aos="fade-up">
                        <figure id="spinner">
                            <div>Gautam Arora</div>
                            <div><img src={pfp} alt="" /></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </figure>
                    </div>
                </div>
                <div className='link-icons'>
                <svg fill="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" height="35px">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
        <svg fill="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"  height="35px">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
        <svg fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" height="35px">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
        <svg fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" viewBox="0 0 24 24" height="35px">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
          <circle cx="4" cy="4" r="2" stroke="none"></circle>
        </svg>
                </div>
                <div className='mail'>agrilink@gmail.com</div>
            </section>
        </>
    )
}

export default Contact