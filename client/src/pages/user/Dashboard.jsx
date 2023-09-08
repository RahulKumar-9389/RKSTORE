import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {

    const [auth] = useAuth();

    return <>
        <Layout title="Dashboard">
            <section className="user_dashboard_container">

               <div className="left">
                <UserMenu/>
               </div>

                <div className="right">
                    <h1>Your Details</h1>
                    <hr />

                    <div className="details_box">
                        <h2>Name</h2>
                        <p>{auth?.user?.name}</p>
                    </div>

                    <div className="details_box">
                        <h2>Email</h2>
                        <p>{auth?.user?.email}</p>
                    </div>

                    <div className="details_box">
                        <h2>Phone</h2>
                        <p>{auth?.user?.phone}</p>
                    </div>

                    <div className="details_box">
                        <h2>Address</h2>
                        <p>{auth?.user?.address}</p>
                    </div>


                </div>

            </section>
        </Layout>
    </>
};

export default Dashboard;