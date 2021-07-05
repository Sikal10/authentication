import classes from "./Login.module.css";
import {BsFillEyeSlashFill} from "react-icons/bs";
import {IoEyeSharp} from "react-icons/io5";
import Image from "next/image";
import background from "../../public/images/bg.jpg";
import Link from "next/link";
import {useState} from "react";

const Login = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    console.log(showPassword)

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <section className={classes.login}>
            <form>
                <h2>Sign In</h2>
                <input type="email" placeholder={"Email"}/>
                <div className={classes.password}>
                    <input className={classes.passwordInput} type={showPassword ? "text" : "password"} placeholder={"Password"}/>
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