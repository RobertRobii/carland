"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setErrorMsg("Invalid credentials");
        return;
      }

      router.replace("/account");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-x-2">
      <div className="flex justify-start items-center">
        <input
          className="outline-none bg-white h-14 border rounded-lg pl-4 focus:border-accent xl:w-full"
          type="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FaUserAlt className="text-accent text-xl ml-2" />
      </div>
      <div className="flex justify-start items-center">
        <input
          className="outline-none mt-2 bg-white h-14 border rounded-lg pl-4 focus:border-accent xl:w-full"
          type={showPassword ? "text" : "password"}
          placeholder="Your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showPassword ? (
          <FaEyeSlash
            className="text-accent text-xl ml-2 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaEye
            className="text-accent text-xl ml-2 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
      {errorMsg && (
        <p className="flex justify-center items-center w-[180px] bg-accent text-white rounded-lg mt-3 py-1 px-3">
          {errorMsg}
        </p>
      )}
      <button className="btn btn-sm btn-accent mt-4 w-24">Sign In</button>
    </form>
  );
};

export default LoginForm;
