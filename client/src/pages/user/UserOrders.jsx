import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import UserMenu from "../../components/UserMenu";
import moment from "moment";

const UserOrders = () => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return <>
        <Layout title='User-Orders'>
            <section className="user_dashboard_container">

                <div className="left">
                    <UserMenu />
                </div>

                <div className="right">
                    <div className="orders_container">
                        {
                            orders?.map((o, i) => (
                                <>
                                    <table className="user_orders_table">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Status</th>
                                                <th>Buyer</th>
                                                <th>Date</th>
                                                <th>Payment</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td data-aria-label="No">{i + 1}</td>
                                                <td data-aria-label="Status">{o?.status}</td>
                                                <td data-aria-label="Name">{o?.buyer?.name}</td>
                                                <td data-aria-label="Date">{moment(o?.createAt).fromNow()}</td>
                                                <td data-aria-label="Payment">{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td data-aria-label="Quantity">{o?.products?.length}</td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <Carousel responsive={responsive}>
                                        {
                                            o?.products?.map((p) => (
                                                <div className="orders_product_card">
                                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                                    <p>{p.name}</p>
                                                </div>
                                            ))
                                        }
                                    </Carousel>


                                </>


                            ))
                        }

                    </div>
                </div>
            </section>
        </Layout>

    </>
};


export default UserOrders;


