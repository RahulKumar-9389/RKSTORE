import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from '../components/Layout';
import {PiShoppingBagLight} from 'react-icons/pi';
import {AiOutlineHeart} from 'react-icons/ai';
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { useWishlist } from "../context/wishlist";

const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState({});
    const [cart, setCart] = useCart();
    const [item, setItem] = useWishlist();


    // GET SINGLE PRODUCT 
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

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
        <Layout title="Product-Details">
            <section className="product_details">

                <div className="img_container">
                    <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} />
                </div>

                <div className="details-container">
                    <h2>{product.name}</h2>
                    <span>{product.category}</span>
                    <h3>Price : ₹ {product.price}</h3>
                    <p>Lorem ipsum dolor  amet consectetur  elit. <br />
                        Distinctio autem sae odio dolores maxime  <br />
                        voluptate pariatur velit doloremque?</p>

                        <div className="actions">
                            <button onClick={()=>handleAddToCart(product)}><PiShoppingBagLight className="addtocart"/>Add To Cart</button>
                            <AiOutlineHeart className="heart" onClick={()=>hanldeAddToWishlist(product)}/>
                        </div>
                </div>

            </section>
        </Layout>
    </>
};

export default ProductDetails;