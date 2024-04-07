"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaUserPlus, FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const { data: session }: any = useSession();
  return (
    <div>
      <ul className="flex justify-between m-10 items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <ul className="flex gap-10 justify-end">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            {!session ? (
              <>
                <li className="flex justify-center items-center gap-2">
                  <FaArrowRight />
                  <Link href="/login">Login</Link>
                </li>
                <li className="flex justify-center items-center gap-2">
                  <FaUserPlus />
                  <Link href="/register">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                {session.user?.email}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                    }}
                    className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
