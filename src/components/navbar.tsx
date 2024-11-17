"use client";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { LuLogIn, LuSave } from "react-icons/lu";
import { FaRegMoon, FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSun } from "react-icons/fi";
import { toast } from "react-toastify";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { auth } from "@/firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import useUserStore from "@/store/userStore";
import Image from "next/image";

function Navbar() {
  const logoutUser = useUserStore((state) => state.logoutUser);
  const user = useUserStore((state) => state.user);

  function signOutFunc() {
    if (!auth.currentUser) {
      toast.error("Not loggedin");
      return;
    }
    signOut(auth)
      .then(() => {
        toast.success("Signed-out successfully!");
        logoutUser();
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
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

            {user.email ? (
              <li>
                <Link
                  className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                  href={"/blog/saved"}
                >
                  <LuSave />
                  Saved Blogs
                </Link>
              </li>
            ) : null}

            {user.role == "admin" ? (
              <li>
                <Link
                  className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                  href={"/dashboard"}
                >
                  <MdOutlineSpaceDashboard />
                  Go to Dashboard
                </Link>
              </li>
            ) : null}

            {user.email ? (
              <li onClick={signOutFunc}>
                <div className="bg-error text-base-100 mb-1 hover:bg-error flex flex-row items-center justify-start">
                  <BiLogOut />
                  Logout
                </div>
              </li>
            ) : (
              <li>
                <Link
                  className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                  href={"/authenticate"}
                >
                  <LuLogIn />
                  Login / Sign-Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a
          href="/"
          className="relative w-20 h-12 sm:w-12 sm:h-8 md:w-16 md:h-10 lg:w-24 lg:h-14 overflow-hidden rounded-lg"
        >
          <Image
            src="/images/bv.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
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

        {user.email ? (
          <Link
            href={"/profile"}
            className="btn btn-ghost btn-circle hover:bg-secondary "
          >
            {user.imageURL ? (
              <Image
                className="w-10 h-10 rounded-full object-cover"
                src={user.imageURL}
                alt={"p"}
                height={35}
                width={35}
              />
            ) : (
              <FaRegUser />
            )}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
