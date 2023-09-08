import {BsArrowRight} from 'react-icons/bs';
import {MdOutlineEmail} from 'react-icons/md';

const Newsletter = ()=>{
    return <>
        <section className="newsletter" style={{backgroundImage:"url('/news.jpg')"}}>
            <div className="newsletter-content">
            <h1>newsletter</h1>
            <p>Don' t forget to subscribe us to get the notification of latest products and discount.</p>
            <div className="input_box">
                <MdOutlineEmail className="email-icon"/>
                <input type="text" placeholder="Enter your email" />
                <span>Subscribe <BsArrowRight className='subscribe-icon'/></span>
            </div>
            </div>
        </section>
    </>
};

export default Newsletter;