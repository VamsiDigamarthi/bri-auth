import axios from "axios";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const successLogin = (res) => {
    console.log(res.data);
    navigate("/");
  };

  const loginFaile = (e) => {
    if (e.response.data.includes("User does not exit......")) {
      setEmailError(e.response.data);
    }
    setPasswordError(e.response.data);
  };

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/auth/login", user)
      .then((res) => {
        successLogin(res);
        setPasswordError("");
      })
      .catch((e) => {
        loginFaile(e);
      });

    setUser({ username: "", password: "" });
  };

  return (
    <div className="h-screen w-full flex flex-row justify-center items-center border-2">
      <div className="flex flex-row justify-center items-center border-solid border border-blue-500 rounded-md w-4/5 md:w-1/2 h-auto">
        <img
          className="w-1/2 h-auto hidden md:block overflow-hidden rounded-md"
          src="./image/undraw_Mobile_re_q4nk.png"
          alt="signupimage"
        />
        <form
          onSubmit={submitForm}
          className="flex flex-col justify-start items-start h-auto w-4/5 md:w-1/2 p-4 md:pl-14 "
        >
          <h1 className="self-center text-lg font-bold text-blue-600 my-3 md:mr-12">
            Login
          </h1>

          <div className="flex flex-row justify-start items-center md:w-4/5 border border-l-blue-500 border-l-4 rounded-t-md rounded-b-md my-1 p-1">
            <HiOutlineMail className="w-1/5 border-r-2 border-blue-200 text-blue-600" />
            <input
              placeholder="Email"
              className="w-4/5 pl-2 h-8 md:h-6 cursor-pointer border-none outline-none placeholder:text-blue-300 text-blue-300"
              type="text"
              onChange={usernameChange}
              name="username"
              value={user.username}
            />
          </div>
          <p className="text-xs text-red-500">
            {emailError && "username not valid"}
          </p>
          <div className="flex flex-row justify-start items-center md:w-4/5 border border-l-blue-500 border-l-4 rounded-t-md rounded-b-md my-1 p-1">
            <RiLockPasswordLine className="w-1/5 border-r-2 border-blue-200 text-blue-600" />
            <input
              placeholder="Password"
              className="w-4/5 pl-2 h-8 md:h-6 cursor-pointer border-none outline-none placeholder:text-blue-300 text-blue-300 "
              type="text"
              onChange={usernameChange}
              name="password"
              value={user.password}
            />
          </div>
          <p className="text-xs text-red-500">
            {passwordError && `${passwordError}`}
          </p>
          <button
            className="p-1 my-2 h-8 md:h-8 w-full md:w-4/5 bg-blue-500 rounded text-white"
            type="submit"
          >
            Log In
          </button>
          <p className="text-xs my-1 text-blue-300">
            <Link to="/signup">you have not account please signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
