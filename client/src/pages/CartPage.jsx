import Layout from "../components/Layout";
import { BsArrowRight, } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbEdit } from 'react-icons/tb';
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";

const CartPage = () => {

    const [auth,] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
            total = total + item.price;
            })
            return total;
        } catch (error) {
            console.log(error);
        }
    };


    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // DELETE PRODUCT
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            toast.success('Product removed successfully', {
                duration: 4000,
                position: 'top-center',
                className: 'notify',
            });
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };


    return <>
        {
            !cart?.length ? (<>
                <Layout title="Cart-Page">
                    <div className="empty-cart-container">
                        <img src="/emptycart.png" alt="emptycart" />
                        <h1>Your cart is empty.</h1>
                        <Link to="/"><button>Continue Shopping <BsArrowRight className="shop-btn" /></button></Link>
                    </div>
                </Layout>
            </>) :
                (

                    <>
                        <Layout title='Cart-Page'>

                            <section className="cart_container">

                            <div className="product-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((p) => (
                                                    <tr key={p.slug}>
                                                        <td>
                                                            <div className="product-detail">
                                                                <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                                                <span>
                                                                    <h4>{p.name}</h4>
                                                                    <p>Buy now and get 30% off</p>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h4>₹{p.price}</h4>
                                                        </td>
                                                        <td>
                                                            <h3>₹{p.price}</h3>
                                                        </td>
                                                        <td >
                                                            <AiOutlineDelete onClick={() => removeCartItem(p._id)} className="product-del" />
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="payment_container">
                                    <div className="payment">
                                        <div className="total">
                                            <h2>Total:</h2>
                                            <h3>₹ {totalPrice()}</h3>
                                        </div>
                                        <hr />
                                        {auth?.user?.address ? (
                                            <>
                                                <div className="address">
                                                    <h2>Address:</h2>
                                                    <p>{auth?.user?.address}</p>
                                                    <Link to="/dashboard/user/edit-profile"><TbEdit className="add-edit" /></Link>

                                                </div>
                                                <hr />
                                            </>
                                        ) : (
                                            <div className="mb-3">
                                                {auth?.token ? (
                                                    <button>Update Address</button>
                                                ) : (
                                                    <button
                                                        className="cart-login-btn"
                                                        onClick={() =>
                                                            navigate("/login", {
                                                                state: "/cart",
                                                            })
                                                        }
                                                    >
                                                        Please Login to checkout
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                        <div className="chekout">
                                            {!clientToken || !auth?.token || !cart?.length ? (
                                                ""
                                            ) : (
                                                <>
                                                    <DropIn
                                                        options={{
                                                            authorization: clientToken,
                                                            paypal: {
                                                                flow: "vault",
                                                            },
                                                        }}
                                                        onInstance={(instance) => setInstance(instance)}
                                                    />

                                                    <button
                                                        className="make-payment"
                                                        onClick={handlePayment}
                                                        disabled={loading || !instance || !auth?.user?.address}
                                                    >
                                                        {loading ? "Processing ...." : "Chekout"}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </section>



                        </Layout>
                    </>
                )
        }
    </>
};

export default CartPage;