"use client";

import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { FaRegMoon, FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSun } from "react-icons/fi";
import { toast } from "react-toastify";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { auth } from "@/firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import Image from "next/image";

function Navbar() {
  function signOutFunc() {
    if (!auth.currentUser) {
      toast.error("Not loggedin");
      return;
    }
    signOut(auth)
      .then(() => {
        toast.success("Signed-out succesfully !");
      })
      .catch((error) => {
        toast.error(`error : ${error.message}`);
      });
  }

  return (
    <div className="navbar bg-neutral text-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-secondary"
          >
            <GiHamburgerMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content  bg-base-100 text-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            <li>
              <Link
                className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                href={"/"}
              >
                <IoHomeOutline />
                Go to Home
              </Link>
            </li>
            <li>
              <Link
                className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                href={"/dashboard"}
              >
                <MdOutlineSpaceDashboard />
                Go to Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                href={"/authenticate"}
              >
                <LuLogIn />
                Login / Sign-Up
              </Link>
            </li>
            <li onClick={signOutFunc}>
              <div className="bg-error text-base-100 mb-1 hover:bg-error flex flex-row items-center justify-start">
                <BiLogOut />
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/">
          <Image
            src="/images/bv.png"
            alt="logo"
            height={25}
            width={70}
            className="rounded-lg w-auto h-auto"
          />
        </a>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-secondary">
          <input
            type="checkbox"
            className="theme-controller"
            value="mytheme2"
          />
          <FiSun className="swap-off h-5 w-5 fill-current" />
          <FaRegMoon className="swap-on h-5 w-5 fill-current" />
        </label>
        <Link
          href={"/profile"}
          className="btn btn-ghost btn-circle hover:bg-secondary"
        >
          <FaRegUser />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
