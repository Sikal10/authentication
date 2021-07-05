import Header from "./Header/Header";
import classes from "./Layout.module.css";

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;