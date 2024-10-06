"use client";

import { auth } from "@/firebase/firebaseauthentication";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { toast } from "react-toastify";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  return (
    <div className="navbar bg-neutral text-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <GiHamburgerMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content  bg-base-100 text-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            <li>
              <Link
                className="bg-secondary text-base-100 mb-1 hover:bg-neutral"
                href={"/"}
              >
                {" "}
                <IoHomeOutline />
                Go to Home
              </Link>
            </li>
            <li>
              <Link
                className="bg-secondary text-base-100 mb-1 hover:bg-neutral"
                href={"/add"}
              >
                <IoMdAdd />
                Add Blog
              </Link>
            </li>
            <li>
              <Link
                className="bg-secondary text-base-100 mb-1 hover:bg-neutral"
                href={"/authenticate"}
                onClick={() => signOut(auth)}
              >
                <LuLogIn />
                Login / Sign-Up
              </Link>
            </li>
            <li
              onClick={() => {
                signOut(auth);
                toast.success("Signed out Succesfully");
              }}
            >
              <div className="bg-error text-base-100 mb-1 hover:bg-error flex flex-row items-center justify-start">
                <BiLogOut />
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/" className="btn btn-ghost text-xl">blog - vibes</a>
      </div>

      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <IoMdSearch />
        </button>
        <Link href={"/profile"} className="btn btn-ghost btn-circle">
          <FaRegUser />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
