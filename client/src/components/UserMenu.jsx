import { BiEdit } from 'react-icons/bi';
import { GoChecklist } from 'react-icons/go';
import { TbLogout } from 'react-icons/tb';
import { RiDashboardLine } from 'react-icons/ri';
import { Link,  } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';


const UserMenu = () => {

    const [auth, setAuth] = useAuth();

    const handleLogout = ()=>{
        setAuth({
            ...auth,
            user:null, 
            token: ""
        });
        localStorage.removeItem("auth");
        toast.success('Logout Successfully', {
            duration: 4000,
            position: 'top-center',
            className: 'notify',
        });
    }

    return <>
          <div className="user_menu">
          <img src="/form-img.png" alt="user" />
            <h2>Hi, {auth?.user?.name}</h2>
            <hr />

            <ul>

            <li>
                    <Link to="/dashboard/user">
                        <RiDashboardLine className='action-icon' />
                        <p>Dashboard</p>
                    </Link>
                </li>

                <li>
                    <Link to="/dashboard/user/edit-profile">
                        <BiEdit className='action-icon' />
                        <p>Edit-Profile</p>
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard/user/orders'>
                        <GoChecklist className='action-icon' />
                        <p>Orders</p>
                    </Link>
                </li>
                <li>
                    <Link to='/login' onClick={handleLogout}>
                        <TbLogout className='action-icon' />
                        <p>Logout</p>
                    </Link>
                </li>
            </ul>
          </div>
    </>
};

export default UserMenu;