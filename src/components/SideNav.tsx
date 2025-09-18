import React, { ReactNode } from "react";
import Link from "next/link";
import { SIDENAV_ITEMS } from "@/app/user/constants";

const SideNav = ({ children }: { children: ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-3">
          {SIDENAV_ITEMS.map((item) => (
            <li key={item.title}>
              <Link
                href={item.path}
                className="btn btn-ghost text-base justify-start gap-3"
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
