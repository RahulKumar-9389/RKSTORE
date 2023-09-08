import { BsArrowRight } from 'react-icons/bs';

const Banner = () => {
    return <>
        <section id="banner">

            <div className="left">
                <img src="/banner.png" alt="" />
            </div>

            <div className="right">

                <div className="headings">
                    <h3>Trade-in-offer</h3>
                    <h2>Super value deals</h2>
                    <h1>On all products</h1>
                    <p>Save more with coupons & up to 70% off!</p>
                    <button>Shop Now <BsArrowRight className='btn-icon' /></button>
                </div>

            </div>
        </section>
    </>
};

export default Banner;