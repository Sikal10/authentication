import axios from "axios";

export const createUser = async (name, email, password) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const response = await axios.post("/api/auth/register", {name, email, password}, config)
        const data = await response.data;
        console.log(data);
        localStorage.setItem("authToken", data.token);
        return data
    } catch (err) {
        console.log("error de here")
        console.log(err.response.data.message)
    }
}

export const loginUser = async (email, password, toast) => {
    try {
        const {data} = await axios.post("/api/auth/login", {email, password});
        console.log(data);
        localStorage.setItem("authToken", data.token);
        toast(data.message)
        return data;
    } catch (err) {
        console.log("error de here from  loginUser")
        toast.error(err.response.data.message);
    }
}

export const logoutHandler = async (router) => {
    localStorage.removeItem("authToken");
    await router.push("/login")
}