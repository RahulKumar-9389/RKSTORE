import { HiOutlineUser } from 'react-icons/hi';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useWishlist } from '../context/wishlist';
import { useSearch } from '../context/search';
import axios from 'axios';

const Header = () => {

    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [auth] = useAuth();
    const [cart] = useCart();
    const [item] = useWishlist();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <section id="header">
            <div className="search_box">
                <input
                    type="text"
                    placeholder="Search.."
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <AiOutlineSearch className='search_icon' type='submit' onClick={handleSubmit} />
            </div>

            <div className="logo">
                <span>RK</span>
                STORE
            </div>

            <div className="right-menu">

                <ul>
                    <li onClick={() => navigate(auth?.user ? auth?.user?.role === 1 ? '/dashboard/admin' : '/dashboard/user' : '/login')}>
                        <HiOutlineUser className='right-menu-icon' />
                        <p>{auth?.user ? auth?.user?.name : `Sign in`}</p>
                    </li>
                    <li onClick={() => navigate("/cart")}>
                        <AiOutlineShoppingCart className='right-menu-icon' />
                        <span className='green'>{cart.length}</span>
                        <p>Cart</p>
                    </li>
                    <li onClick={() => navigate("/wishlist")}>
                        <AiOutlineHeart className='right-menu-icon' />
                        <span className='dark'>{item.length}</span>
                        <p>Wishlist</p>
                    </li>
                </ul>
            </div>
        </section>

        <hr />

        <nav className="navbar">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link>About</Link></li>
                <li><Link>Contact</Link></li>
                <li><Link to={auth?.user ? auth?.user?.role === 1 ? '/dashboard/admin' : '/dashboard/user' : '/login'}>My Account</Link></li>
            </ul>
        </nav>

        <div className="mobile search_box">
            <input
                type="text"
                placeholder="Search.."
                value={values.keyword}
                onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            />
            <AiOutlineSearch className='search_icon' type='submit' onClick={handleSubmit} />
        </div>


    </>
};

export default Header;