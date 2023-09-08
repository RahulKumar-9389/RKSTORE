import Layout from "../components/Layout";
import { AiOutlineDelete } from 'react-icons/ai';
import { useWishlist } from "../context/wishlist";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";

const Wishlist = () => {

    const [item, setItem] = useWishlist();
    const [auth,] = useAuth();

    // DELETE PRODUCT
    const removeWishlistItem = (pid) => {
        try {
            let myWishlist = [...item];
            let index = myWishlist.findIndex((item) => item._id === pid);
            myWishlist.splice(index, 1);
            setItem(myWishlist);
            toast.success('Product removed successfully', {
                duration: 4000,
                position: 'top-center',
                className: 'notify',
            });
            localStorage.setItem("wishlist", JSON.stringify(myWishlist));
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <Layout title='Cart-Page'>

            <section className="cart_container">
                <div className="wishlist-heading">
                    <h1>Hi, <span>{auth?.user?.name}</span> there are {item?.length} items in your wishlist.</h1>
                </div>

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
                                item.map((p) => (
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
                                            <AiOutlineDelete onClick={() => removeWishlistItem(p._id)} className="product-del" />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>

        </Layout>
    </>
};

export default Wishlist;