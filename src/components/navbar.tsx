"use client";

import { auth } from "@/firebase/firebaseauthentication";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { FaRegMoon, FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import { FiSun } from "react-icons/fi";

function Navbar() {
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
                href={"/add"}
              >
                <IoMdAdd />
                Add Blog
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
            <li
              onClick={() => {
                signOut(auth);
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
        <a href="/">
          {/* blog - vibes */}
          <Image
            src="/images/bv.png"
            alt="logo"
            height={25}
            width={70}
            className="rounded-lg"
          />
        </a>
      </div>

      <div className="navbar-end">
        {/* <button className="btn btn-ghost btn-circle hover:bg-secondary">
          <IoMdSearch />
        </button> */}
        <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-secondary">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="black" />

          {/* sun icon */}
          <FiSun className="swap-off h-5 w-5 fill-current" />

          {/* moon icon */}
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
