import { BiLogIn } from 'react-icons/bi';
import { HiMenuAlt1 } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const AdminHeader = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem("auth");
        toast.success('Logout Successfully');
        navigate('/');
    }

    return <>
        <header id="admin_header">
            <div className="logo">
                <span>RK</span>STORE
            </div>

            <nav className="admin_menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard/admin">Dashboard</Link></li>
                    <li><Link to="/dashboard/admin/edit-profile">Profile</Link></li>
                    <li><Link to="/dashboard/admin/orders">Orders</Link></li>
                    <li><Link to="/dashboard/admin/products">Products</Link></li>
                    <li><button onClick={handleLogout}>Logout <BiLogIn className="logout-icon" /></button></li>
                </ul>
            </nav>

            <HiMenuAlt1 className="menu-icon" onClick={()=>setShowMenu(!showMenu)}/>

            <nav className="admin_mobile_menu" style={{right: showMenu ? '0px' : '-50vw'}}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard/admin">Dashboard</Link></li>
                    <li><Link to="/dashboard/admin/edit-profile">Profile</Link></li>
                    <li><Link to="/dashboard/admin/orders">Orders</Link></li>
                    <li><Link to="/dashboard/admin/products">Products</Link></li>
                    <li><button onClick={handleLogout}>Logout <BiLogIn className="logout-icon" /></button></li>
                </ul>
            </nav>
        </header>
    </>
};


export default AdminHeader;