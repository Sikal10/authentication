import classes from "./Register.module.css";
import Link from "next/link";
import background from "../../public/images/bg.jpg";
import Image from "next/image";
import {BsFillEyeSlashFill} from "react-icons/bs";
import {IoEyeSharp} from "react-icons/io5";
import {useState} from "react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className={classes.register}>
            <form>
                <h2>Register</h2>
                <input type="text" placeholder={"Name"}/>
                <input type="email" placeholder={"Email"}/>
                <div className={classes.password}>
                    <input className={classes.password__input} type={showPassword ? "text" : "password"} placeholder={"Password"} required/>
                    {showPassword ? <IoEyeSharp onClick={toggleVisibility} className={classes.icon} /> : <BsFillEyeSlashFill onClick={toggleVisibility} className={classes.icon} />}
                </div>
                <div className={classes.password}>
                    <input className={classes.password__input} type={showPassword ? "text" : "password"} placeholder={"Confirm Password"} required/>
                    {showPassword ? <IoEyeSharp onClick={toggleVisibility} className={classes.icon} /> : <BsFillEyeSlashFill onClick={toggleVisibility} className={classes.icon} />}
                </div>
                <button>Register</button>
                <p>Already have an account? <span><Link href={"/login"}>Login</Link></span></p>
            </form>

            <div className={classes.registerImage}>
                <Image height={500} width={400} src={background} alt=""/>
            </div>
        </div>
    );
};

export default Register;