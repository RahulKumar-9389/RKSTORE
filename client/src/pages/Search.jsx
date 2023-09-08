import Layout from "../components/Layout";
import { useSearch } from "../context/search";
import { AiOutlineEye, AiOutlineHeart, AiOutlineShopping } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useWishlist } from "../context/wishlist";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
const Search = () => {

    const [cart, setCart] = useCart();
    const [item, setItem] = useWishlist();
    const navigate = useNavigate();


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

    const [values,] = useSearch();
    return (
        <Layout title={"Search results"}>
            {
                values?.results.length ?
                    (<>
                        <h1 className="search_heading">{values?.results.length} Products Found</h1>
                        <section className="products_container">

                            <div className="products">
                                {
                                    values?.results.map((p) => (
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
                    </>) :
                    (<>
                        <div className="noSearch">
                            <img src="/noProduct.png" alt="no item" />
                            <h1>Opps! No Item Found</h1>
                        </div>
                    </>)
            }

        </Layout>
    );
};

export default Search;
