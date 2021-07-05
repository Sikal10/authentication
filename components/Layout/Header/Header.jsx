import classes from "./Header.module.css";
import Link from "next/link";

const Header = () => {
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
            </ul>
        </header>
    );
};

export default Header;