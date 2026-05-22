import { setToken } from "@/store/authSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const useLoginManager = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/user/login", form);

            const token = response.data.data.token;
            const fullname = response.data.data.fullname
            const username = response.data.data.username

            console.log(response.data);

            dispatch(setToken(token));

            // simpan di local storage
            localStorage.setItem("token", token);
            localStorage.setItem("fullname", fullname)
            localStorage.setItem("username", username)

            navigate("/")
            setForm({email: "", password: ""})
        } catch (error: any) {
            console.error(error);
            setForm({email: "", password: ""})
            alert(error.response?.data?.error || "Login gagal");
        }
    };

    return {
        handleChange,
        handleSubmit,
        form
    }
}

export const useRegisterManager = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log(form);
            const response = await axios.post("http://localhost:3000/user/register", form);

            console.log(response.data);

            alert("Register berhasil!");
            navigate("/login")
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.error || "Register gagal");
        }
    };

    return {
        handleSubmit,
        handleChange,
        form,
    }
}