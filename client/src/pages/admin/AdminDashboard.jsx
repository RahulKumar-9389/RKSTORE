import { FaUsers } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { GiTakeMyMoney } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import AdminHeader from '../../components/AdminHeader';


const AdminDashboard = () => {

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
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

    // GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            alert("Someething Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);


    // GET ALL USERS 
    const getAllUsers = async () => {
        const { data } = await axios.get("http://localhost:8080/api/v1/auth/get-users");
        setUsers(data?.users);
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return <>
        <AdminHeader />
        <hr />

        <section id="admin_dashboard">
            <div className="card-container">

                <div className="card card-1">

                    <span>
                        <h2>0{users?.length}</h2>
                        <p>users per month</p>
                    </span>

                    <span>
                        <FaUsers className='users-icon' />
                    </span>

                </div>

                <div className="card card-2">

                    <span>
                        <h2>0{products?.length}</h2>
                        <p>Products</p>
                    </span>

                    <span>
                        <BsCart3 className='users-icon' />
                    </span>

                </div>

                <div className="card card-3">

                    <span>
                        <h2>0{orders?.length}</h2>
                        <p>orders per month</p>
                    </span>

                    <span>
                        <GiTakeMyMoney className='users-icon' />
                    </span>

                </div>

            </div>

            <table className='user_table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => (
                            <tr key={user._id}>
                                <td data-aria-label='#'>{i + 1}</td>
                                <td data-aria-label='Name'>{user.name}</td>
                                <td data-aria-label='Email'>{user.email}</td>
                                <td data-aria-label='Phone'>{user.phone}</td>
                                <td data-aria-label='Address'>{user.address}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>

    </>
};

export default AdminDashboard;