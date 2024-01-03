"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { RiFileUserFill } from "react-icons/ri";

const RegisterForm = ({ isDarkMode }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password) {
      setErrorMsg("Please fill in all required fields");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setErrorMsg("User with this email already exists");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (res.ok) {
        console.log("Registration successful");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setErrorMsg("");

        router.push("/");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
  };

  return (
    <section
      className={`h-screen ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } transition-all duration-300`}
    >
      <div className="container mx-auto h-full pt-20 xl:pt-10">
        <div className="flex flex-col xl:flex-row justify-center items-center h-full">
          <div className="text-center xl:max-w-xl xl:text-left mt-16 xl:mt-0">
            <motion.h1
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.6 }}
              className={`h1 uppercase ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Create account
            </motion.h1>
            <motion.form
              onSubmit={handleSubmit}
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.8 }}
              className="flex flex-col justify-center items-center xl:items-start"
            >
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="First name"
                  className="outline-none bg-white h-14 w-[300px] xl:w-[400px] border rounded-lg pl-4 focus:border-accent"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <RiFileUserFill className="absolute text-xl text-accent right-4 top-4 transform -translate-y-1/2 mt-3" />
              </div>
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Last name"
                  className="outline-none bg-white mt-6 h-14 w-[300px] xl:w-[400px] border rounded-lg pl-4 focus:border-accent"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <RiFileUserFill className="absolute text-xl text-accent right-4 top-1/2 transform -translate-y-1/2 mt-3" />
              </div>
              <div className="relative flex">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="outline-none bg-white mt-6 h-14 w-[300px] xl:w-[400px] border rounded-lg pl-4 focus:border-accent"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FaEnvelope className="absolute text-lg text-accent right-4 top-1/2 transform -translate-y-1/2 mt-3" />
              </div>
              <div className="relative flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="outline-none bg-white mt-6 h-14 w-[300px] xl:w-[400px] border rounded-lg pl-4 pr-12 focus:border-accent"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute text-xl text-accent right-4 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute text-xl text-accent right-4 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errorMsg && (
                <p className="bg-accent text-white rounded-lg mt-3 py-1 px-3">
                  {errorMsg}
                </p>
              )}
              <button className="btn btn-sm bg-accent w-28 mt-6">Create</button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
