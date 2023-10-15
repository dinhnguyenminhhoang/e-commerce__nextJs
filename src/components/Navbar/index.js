"use client";

import Link from "next/link";
import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { adminNavOptions, navOptions } from "@/utils";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

const NavItems = ({ isModalView = false, isAdminView }) => {
    return (
        <div
            className={`justify-between items-center w-full md:flex md:w-auto ${
                isModalView ? "" : "hidden"
            }`}
            id="nav-items"
        >
            <ul
                className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
                    isModalView ? "border-none" : "border border-gray-100"
                }`}
            >
                {isAdminView
                    ? adminNavOptions.map((item) => (
                          <li
                              className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                              key={item.id}
                          >
                              <Link href={item.path}>{item.label}</Link>
                          </li>
                      ))
                    : navOptions.map((item) => (
                          <li
                              className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                              key={item.id}
                          >
                              <Link href={item.path}> {item.label}</Link>
                          </li>
                      ))}
            </ul>
        </div>
    );
};
const Navbar = () => {
    const { showNavModal, setShowNavModal } = useContext(GlobalContext);
    const { isAuthUser, setIsAuthUser, user, setUser } =
        useContext(GlobalContext);
    const pathName = usePathname();
    const router = useRouter();
    const handleLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove("token");
        localStorage.clear();
    };
    const isAdminView = pathName.includes("admin-view");
    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-100">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div
                        onClick={() => router.push("/")}
                        className="flex items-center cursor-pointer"
                    >
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">
                            Ecommercery
                        </span>
                    </div>
                    <div className="flex gap-2 md:order-2">
                        {isAuthUser ? (
                            <Fragment>
                                <button className="mt-1.5 inline-block bg-black px-5 py-3 text-sm font-medium upprcase tracking-wide text-white rounded">
                                    {user.name || "Account"}
                                </button>
                                <button className="mt-1.5 inline-block bg-black px-5 py-3 text-sm font-medium upprcase tracking-wide text-white rounded">
                                    cart
                                </button>
                            </Fragment>
                        ) : null}
                        {user?.role == "admin" ? (
                            isAdminView ? (
                                <button
                                    onClick={() => router.push("/")}
                                    className="mt-1.5 inline-block bg-black px-5 py-3 text-sm font-medium upprcase tracking-wide text-white rounded"
                                >
                                    Client view
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.push("/admin-view")}
                                    className="mt-1.5 inline-block bg-black px-5 py-3 text-sm font-medium upprcase tracking-wide text-white rounded"
                                >
                                    Admin view
                                </button>
                            )
                        ) : null}
                        {isAuthUser ? (
                            <button
                                onClick={handleLogout}
                                className="mt-1.5 inline-block bg-black px-5 py-3 text-sm font-medium upprcase tracking-wide text-white rounded"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push("/login")}
                                className="mt-1.5 inline-block bg-black px-5 py-3 text-sm font-medium upprcase tracking-wide text-white rounded"
                            >
                                Login
                            </button>
                        )}
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            onClick={() => setShowNavModal(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <NavItems isAdminView={isAdminView} />
                </div>
            </nav>
            {
                <CommonModal
                    router={router}
                    isAdminView={isAdminView}
                    show={showNavModal}
                    setShow={setShowNavModal}
                    showModalTitle={false}
                    mainContent={<NavItems isModalView={true} />}
                />
            }
        </>
    );
};

export default Navbar;
