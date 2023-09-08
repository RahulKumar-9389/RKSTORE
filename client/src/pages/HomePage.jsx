import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Layout from '../components/Layout';
import axios from 'axios';
import { AiOutlineEye, AiOutlineHeart, AiOutlineShopping } from 'react-icons/ai';
import { useCart } from '../context/cart';
import { useWishlist } from '../context/wishlist';
import Newsletter from '../components/Newsletter';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const HomePage = () => {

    const [cart, setCart] = useCart();
    const [item, setItem] = useWishlist();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // GET ALL PRODUCTS
    const getAllProducts = async () => {
        const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
        setProducts(data?.products);
    };

    useEffect(() => {
        getAllProducts();
    }, [])



    // ADD TO CART FUNCTION
    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        localStorage.setItem('cart', JSON.stringify([...cart, product]));
        toast.success('Product Added Into Cart', {
            duration: 4000,
            position: 'top-center',
            className: 'notify',
        });
    }

    // ADD TO WISHLIST FUNCTION
    const hanldeAddToWishlist = (product) => {
        setItem([...item, product]);
        localStorage.setItem('wishlist', JSON.stringify([...item, product]));
        toast.success('Product Added Into Wishlist', {
            duration: 4000,
            position: 'top-center',
            className: 'notify',
        });
    }



    return <>
        <Layout title="Home">
            <Banner />

            <section className="products_container">
                <h1>Our Latest Products</h1>

                <div className="products">
                    {
                        products.map((p) => (
                            <div className="product_card" key={p._id}>
                                <div className="img_box">
                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                    <ul className='card-actions'>
                                        <li onClick={() => handleAddToCart(p)}>
                                            <AiOutlineShopping className="product-icon" />
                                            <span>Add To Cart</span>
                                        </li>
                                        <li onClick={() => hanldeAddToWishlist(p)}>
                                            <AiOutlineHeart className="product-icon" />
                                            <span>Add To Wishlist</span>
                                        </li>
                                        <li onClick={() => navigate(`/product-details/${p.slug}`)}>
                                            <AiOutlineEye className="product-icon" />
                                            <span>View Details</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card_content">
                                    <h2>{p.name}</h2>
                                    <h3>₹ {p.price}</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </section>

            <Newsletter />

        </Layout>
    </>
};

export default HomePage;