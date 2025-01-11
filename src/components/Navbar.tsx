import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import SignInModal from "@/dialogs/SignIn";
import SignUp from "@/dialogs/SignUp";
import { useUser } from "@/context/UserContext";
import axios from "axios";

const Navbar = () => {
  const { family } = useUser();
  const handleLogout = async () => {
    await axios.get("/api/user/logout");
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };
  return (
    <nav className="bg-accent text-accent-content shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          href="/"
          className="cursor-pointer flex flex-row gap-2 justify-center items-center"
        >
          <img src="/community.svg" width="40px" height="40px" alt="Logo" />
          <span className="text-4xl">Kutumbak</span>
        </Link>
        <ul className="flex space-x-6">
          {["About Us", "Events", "Contact"].map((item, index) => (       // removed Home
            <li key={index} className="group">
              <Link href={`/${item.toLowerCase().replace(" ", "")}`}>
                <span className="font-medium text-lg hover:text-primary-content transition-colors duration-200">
                  {item}
                </span>
              </Link>
              <div className="h-1 w-full bg-primary-content scale-0 group-hover:scale-100 transition-transform duration-200 origin-center"></div>
            </li>
          ))}
        </ul>
        {!family && (
          <div className="flex space-x-4 items-center">
            <button
              className="btn btn-outline btn-primary rounded-md text-base-100 border-base-100 hover:bg-primary-content"
              onClick={() => {
                (
                  document.getElementById("signup") as HTMLDialogElement
                ).showModal();
              }}
            >
              Register
            </button>
            <button
              className="btn btn-primary rounded-md text-base-100"
              onClick={() => {
                (
                  document.getElementById("signin") as HTMLDialogElement
                ).showModal();
              }}
            >
              Login
            </button>
            <ThemeToggler />
          </div>
        )}
        {family && (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
            >
              <li>
                <Link
                  href="/user/profile"
                  className="justify-between btn btn-ghost text-base"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/user/profile/settings"
                  className="btn btn-ghost justify-between text-base"
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-error hover:btn-outline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <SignInModal />
      <SignUp />
    </nav>
  );
};

export default Navbar;
