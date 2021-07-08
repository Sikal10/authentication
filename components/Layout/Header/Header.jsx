import classes from "./Header.module.css";
import Link from "next/link";
import {logoutHandler} from "../../../utils/auth";
import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter();
    const logout = async () => {
        await logoutHandler(router)
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href={"/"}>
                    <a>Sikal</a>
                </Link>
            </div>

            <ul>
                <li><Link href={"/login"}>Login</Link></li>
                <li><Link href={"/register"}>Sign Up</Link></li>
                <button onClick={logout} className={"btn-secondary"}>Logout</button>
            </ul>
        </header>
    );
};

export default Header;