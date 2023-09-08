import { MdOutlineEmail } from 'react-icons/md';
import { BiLockAlt, BiMapPin } from 'react-icons/bi';
import { AiOutlineClose, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import AdminHeader from '../../components/AdminHeader';

const AdminEditProfile = () => {

    const [auth, setAuth] = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    //get user data
    useEffect(() => {
        setName(auth?.user?.name);
        setEmail(auth?.user?.email);
        setPhone(auth?.user?.phone);
        setAddress(auth?.user?.address);
    }, [auth?.user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.errro) {
                alert(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                alert("Profile Updated Successfully");
                navigate('/dashboard/user')
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return <>

    <AdminHeader/>

        <section className="form_container" style={{ backgroundImage: "url('/form-bg.jpg')" }}>
            <form method="post" onSubmit={handleUpdate}>

                <AiOutlineClose onClick={() => navigate('/dashboard/admin')} className="form_close" />

                <h1>Edit-Profile</h1>


                <div className="input_box">
                    <AiOutlineUser className="form-icon" />
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="input_box">
                    <MdOutlineEmail className="form-icon" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled
                    />
                </div>

                <div className="input_box">
                    <AiOutlinePhone className="form-icon" />
                    <input
                        type="number"
                        placeholder="Enter your phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="input_box">
                    <BiLockAlt className='form-icon' />
                    <input
                        type="password" placeholder="Create your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="input_box">
                    <BiMapPin className='form-icon' />
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>


                <button>Update</button>
            </form>
        </section>

    </>
};

export default AdminEditProfile;