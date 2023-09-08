import { MdOutlineEmail } from 'react-icons/md';
import { BiLockAlt, BiMapPin } from 'react-icons/bi';
import { Link, useNavigate} from 'react-router-dom';
import { AiOutlinePhone, AiOutlineUser ,  AiOutlineClose} from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
                name,
                email,
                phone,
                password,
                address,
            });
            if (res && res.data.success) {
                toast.success('Register successfully', {
                    duration: 4000,
                    position: 'top-center',
                    className: 'notify',
                });
                navigate('/login');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };


    return <>
        <div className="form_container" style={{backgroundImage: "url('/form-bg.jpg')"}}>
            <form method="post" onSubmit={handleSubmit}>

            <AiOutlineClose onClick={()=>navigate('/')} className="form_close"/>

                <img src="/form-img.png" alt="user" />
                <h1>Register</h1>

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


                <button>Register</button>

                <p>Already have an account.<Link to="/login">Login</Link></p>
            </form>
        </div>
    </>
};

export default Register;