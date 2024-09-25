import overlayImg from '../assets/overlay.png'

function Hero() {
    return (
        <>
            <section className="hero">
                <div className="hero_overlay">
                    <img src={overlayImg} alt="" />
                </div>
                <div className="hero_main">
                    <div className="hero_main-title title">Empowering Farmers Through Decentralization</div>
                    <div className="hero_main-description">Empowering farmers through decentralized solutions and sustainable practices. Join us in revolutionizing agriculture for a brighter, more resilient future. Together, let's cultivate abundance while nurturing our planet.</div>
                    <div className="hero_main-caption"> 
                    
                    <p className="first-quote">"Where Tradition Meets Innovation in Agriculture's Next Chapter."</p>
                    <p className="second-quote">"Every seed holds the promise of a thriving tomorrow."</p>
                    
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero