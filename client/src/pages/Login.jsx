import { useState } from "react";
import { MdOutlineEmail } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../context/auth';
import axios from "axios";
import { toast } from "react-hot-toast";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // SUBMIT FORM
    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const res = await axios.post("http://localhost:8080/api/v1/auth/login", { email, password });
            if(res && res.data.success){
                setAuth({
                    ...auth,
                    user: res?.data?.user,
                    token: res?.data?.token,
                });
    
                localStorage.setItem("auth", JSON.stringify(res?.data));
                toast.success('Login Successfully', {
                    duration: 4000,
                    position: 'top-center',
                    className: 'notify',
                });
                navigate(location.state || "/");
            }
            else{
                alert("Data is not found!");
            }



        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
        }
    }

    return <>
        <div className="form_container" style={{backgroundImage: "url('/form-bg.jpg')"}}>
            <form method="post" onSubmit={handleSubmit}>

                <AiOutlineClose onClick={()=>navigate('/')} className="form_close"/>

                <img src="/form-img.png" alt="user" />
                <h1>Login</h1>


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
                    <BiLockAlt className='form-icon' />
                    <input
                        type="password" placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="chek_box">
                    <input type="checkbox" id="chek" />
                    <label htmlFor="chke">Remember Me</label>
                </div>


                <button>Login</button>

                <p>Don't have any account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    </>
};

export default Login;