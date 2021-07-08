import classes from "./Login.module.css";
import {BsFillEyeSlashFill} from "react-icons/bs";
import {IoEyeSharp} from "react-icons/io5";
import Image from "next/image";
import background from "../../public/images/bg.jpg";
import Link from "next/link";
import {useState} from "react";
import {loginUser} from "../../utils/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password, toast);
            if (localStorage.getItem("authToken")) {
                await router.push("/");
            }
        } catch (err) {
            toast(err.response.data.message);
        }
    }

    return (
        <section className={classes.login}>
            <form onSubmit={loginHandler}>
                <h2>Sign In</h2>
                <ToastContainer autoClose={10000} />
                <input value={email} onChange={e => setEmail(e.target.value)}  type="email" placeholder={"Email"}/>
                <div className={classes.password}>
                    <input value={password} onChange={e => setPassword(e.target.value)} className={classes.passwordInput} type={showPassword ? "text" : "password"} placeholder={"Password"}/>
                    {showPassword ? <IoEyeSharp onClick={toggleVisibility} className={classes.icon} /> : <BsFillEyeSlashFill onClick={toggleVisibility} className={classes.icon} />}
                </div>

                <button>Sign In</button>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>Don't have an account? <span><Link href={"/register"}>Register</Link></span></p>
            </form>

            <div className={classes.image}>
                <Image alt={""} src={background} width={350} height={400} />
            </div>

        </section>
    );
};

export default Login;