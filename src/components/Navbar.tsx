import { useState } from "react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import SignInModal from "@/dialogs/SignIn";
import SignUp from "@/dialogs/SignUp";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const { family } = useUser();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await axios.get("/api/user/logout");
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  return (
    <nav className="bg-accent text-accent-content shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link
          href="/"
          className="cursor-pointer flex flex-row gap-2 items-center"
        >
          <Image
            src="/community.svg"
            alt="Logo"
            width={40} // width in pixels
            height={40} // height in pixels
          />
          <span className="text-2xl md:text-4xl font-sans">Kutumbak</span>
        </Link>
        <button
          className="block md:hidden btn btn-ghost"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <ul className="hidden md:flex space-x-6">
          {["About Us", "Events", "Contact"].map((item, index) => (
            <li key={index} className="group">
              <Link href={`/${item.toLowerCase().replace(" ", "")}`}>
                <span className="font-medium text-sm md:text-lg hover:text-primary-content transition-colors duration-200">
                  {item}
                </span>
              </Link>
              <div className="h-1 w-full bg-primary-content scale-0 group-hover:scale-100 transition-transform duration-200 origin-center"></div>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center space-x-4">
          {!family && (
            <>
              <button
                className="btn btn-outline btn-primary rounded-md text-sm md:text-base border-base-100 hover:bg-primary-content"
                onClick={() => {
                  (
                    document.getElementById("signup") as HTMLDialogElement
                  ).showModal();
                }}
              >
                Register
              </button>
              <button
                className="btn btn-primary rounded-md text-sm md:text-base"
                onClick={() => {
                  (
                    document.getElementById("signin") as HTMLDialogElement
                  ).showModal();
                }}
              >
                Login
              </button>
              <ThemeToggler animation />
            </>
          )}

          {family && (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 md:w-10 rounded-full">
                  <Image
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    width={100} // specify width in pixels
                    height={100} // specify height in pixels
                  />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-40 md:w-52 p-2 shadow gap-2"
              >
                <li>
                  <Link
                    href="/user/profile"
                    className="btn btn-ghost text-sm md:text-base justify-between"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/profile/settings"
                    className="btn btn-ghost text-sm md:text-base justify-between"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-error hover:btn-outline text-sm md:text-base"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="block md:hidden bg-accent text-accent-content">
          <ul className="flex flex-col space-y-4 items-center py-4">
            {["About Us", "Events", "Contact"].map((item, index) => (
              <li key={index} className="group">
                <Link href={`/${item.toLowerCase().replace(" ", "")}`}>
                  <span className="font-medium text-base hover:text-primary-content transition-colors duration-200">
                    {item}
                  </span>
                </Link>
              </li>
            ))}
            {!family && (
              <>
                <button
                  className="btn btn-outline btn-primary rounded-md text-sm w-3/4 border-base-100 hover:bg-primary-content"
                  onClick={() => {
                    (
                      document.getElementById("signup") as HTMLDialogElement
                    ).showModal();
                  }}
                >
                  Register
                </button>
                <button
                  className="btn btn-primary rounded-md text-sm w-3/4"
                  onClick={() => {
                    (
                      document.getElementById("signin") as HTMLDialogElement
                    ).showModal();
                  }}
                >
                  Login
                </button>
                <ThemeToggler animation />
              </>
            )}
          </ul>
        </div>
      )}
      <SignInModal />
      <SignUp />
    </nav>
  );
};

export default Navbar;
