import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import AdminHeader from "../../components/AdminHeader";
const { Option } = Select;

const AdminOrders = () => {

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

  const [status,] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  //  GET ALL ORDERS 
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return <>
    <AdminHeader />

    <section className="admin_orders">
      <>

        {
          orders.map((o, i) => (
            <>
              <table className="admin_orders_table" key={o._id}>
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
                    <td data-aria-label="No.">{i + 1}</td>
                    <td data-aria-label="Status">
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
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

      </>
    </section>
  </>
};

export default AdminOrders;

