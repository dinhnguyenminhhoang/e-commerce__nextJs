"use client";

import { GlobalContext } from "@/app/context";
import { adminNavOptions, navOptions, styles } from "@/app/utils";
import Link from "next/link";
import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";

const isAdminView = false;
const isAthuUser = true;
const user = {
    role: "admin",
};
const NavItems = ({ isModalView = false }) => {
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

    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-100">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center cursor-pointer">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">
                            Ecommercery
                        </span>
                    </div>
                    <div className="flex gap-2 md:order-2">
                        {!isAdminView && isAthuUser ? (
                            <Fragment>
                                <button className={styles.button}>
                                    Account
                                </button>
                                <button className={styles.button}>cart</button>
                            </Fragment>
                        ) : null}
                        {user?.role == "admin" ? (
                            isAdminView ? (
                                <button className={styles.button}>
                                    Client view
                                </button>
                            ) : (
                                <button className={styles.button}>
                                    Admin view
                                </button>
                            )
                        ) : null}
                        {isAthuUser ? (
                            <button className={styles.button}>Logout</button>
                        ) : (
                            <button className={styles.button}>Login</button>
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
                    <NavItems />
                </div>
            </nav>
            {
                <CommonModal
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