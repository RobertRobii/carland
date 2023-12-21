"use client";

import Image from "next/image";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import Copyright from "./Copyright";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <footer className="pt-20 bg-white z-20" id="info">
      <div className="container mx-auto mb-24">
        <div className="mb-10">
          <Image
            src={"/icons/logo.svg"}
            width={200}
            height={200}
            alt={"logo"}
          />
        </div>
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.6 }}
          className="flex flex-col lg:flex-row lg:justify-between gap-x-5 gap-y-14"
        >
          <div className="flex flex-col flex-1 gap-y-8">
            <div className="flex flex-col gap-y-4 font-semibold">
              <h3 className="h3 font-bold mb-8">Contact details</h3>
              <div className="flex items-center gap-x-[10px]">
                <FaPhone />
                <div className="font-medium">0712 345 678</div>
              </div>
              <div className="flex items-center gap-x-[10px]">
                <FaEnvelope />
                <div className="font-medium">contact@carland.com</div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col xl:items-center">
            <div>
              <h3 className="h3 font-bold mb-8">Company</h3>
              <ul className="flex flex-col gap-y-4 font-semibold">
                <li>
                  <Link className="hover:text-accent" href="">
                    Brasov
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-accent" href="careers">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-accent" href="">
                    How we work
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-accent" href="">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-accent" href="">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-accent" href="">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="h3 font-bold mb-8">Working Hours</h3>
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-2">
                <div className="text-secondary">Mon-Fri:</div>
                <div className="font-semibold">10:00AM - 18:00PM</div>
              </div>
              <div className="flex gap-x-2">
                <div className="text-secondary">Sat:</div>
                <div className="font-semibold">12:00AM - 16:00PM</div>
              </div>
              <div className="flex gap-x-2">
                <div className="text-secondary">Sun:</div>
                <div className="font-semibold">Closed</div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="h3 font-bold mb-8">Account</h3>
            <div className="mb-4 text-secondary">
              Go to your Carland account
            </div>
            <form className="flex flex-col gap-x-2">
              <div className="flex justify-start items-center">
                <input
                  className="outline-none bg-white h-14 border rounded-lg pl-4 focus:border-accent xl:w-full"
                  type="email"
                  placeholder="Your email"
                  required
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
              <button className="btn btn-sm btn-accent mt-4 w-24">
                Sign In
              </button>
            </form>
            <div
              onClick={handleRegisterClick}
              className="mt-8 font-semibold text-secondary hover:text-accent hover:underline cursor-pointer"
            >
              You don't have an account? Register here now!
            </div>
          </div>
        </motion.div>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
