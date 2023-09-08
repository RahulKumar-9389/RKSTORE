import { TfiLocationPin } from 'react-icons/tfi';
import { AiFillLinkedin, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { MdOutlineCall, MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
    return <>
        <footer id="footer">

            <div className="col-1">
                <h2>Contact Us</h2>
                <ul>
                    <li>
                        <TfiLocationPin className='footer-icon' />
                        <p>Mawana Meerut (Uttar Pardesh )</p>
                    </li>
                    <li>
                        <MdOutlineCall className='footer-icon' />
                        <p>(+ 91) 9389208280</p>
                    </li>
                    <li>
                        <MdOutlineEmail className='footer-icon' />
                        <p>rahulkumar.programmer@gmail.com</p>
                    </li>
                </ul>
            </div>

            <div className="col-2">
                <h2>Usefull Links</h2>
                <ul>
                    <li><Link>Home</Link></li>
                    <li><Link>About</Link></li>
                    <li><Link>Terms & Condition</Link></li>
                </ul>
            </div>

            <div className="col-3">
                <h2>Follow Us</h2>
                <ul>
                    <li>
                        <AiOutlineTwitter className='footer-icon' />
                        <p>Twitter</p>
                    </li>
                    <li>
                        <AiOutlineInstagram className='footer-icon' />
                        <p>Instagram</p>
                    </li>
                    <li>
                        <AiFillLinkedin className='footer-icon' />
                        <p>Linkdin</p>
                    </li>
                </ul>
            </div>
        </footer>
        <div className="copyright">
            <h1>Copyright © 2023. All Rights Reserved <span>RahulKumar</span></h1>
        </div>
    </>
};

export default Footer;