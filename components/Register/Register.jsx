import classes from "./Register.module.css";
import Link from "next/link";
import background from "../../public/images/bg.jpg";
import Image from "next/image";
import {BsFillEyeSlashFill} from "react-icons/bs";
import {IoEyeSharp} from "react-icons/io5";
import {useState} from "react";
import {createUser} from "../../utils/auth";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert("Passwords do not match.")
        }

        const user = await createUser(name, email, password)
        console.log(user);
    }

    return (
        <div className={classes.register}>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder={"Name"}/>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder={"Email"}/>
                <div className={classes.password}>
                    <input value={password} onChange={e => setPassword(e.target.value)} className={classes.password__input} type={showPassword ? "text" : "password"} placeholder={"Password"} required/>
                    {showPassword ? <IoEyeSharp onClick={toggleVisibility} className={classes.icon} /> : <BsFillEyeSlashFill onClick={toggleVisibility} className={classes.icon} />}
                </div>
                <div className={classes.password}>
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}  className={classes.password__input} type={showPassword ? "text" : "password"} placeholder={"Confirm Password"} required/>
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