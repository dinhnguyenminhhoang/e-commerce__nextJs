"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../Modal/CartModal";
import Notification from "../Notification";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import SearchModal from "../Modal/SearchModal/SearchModal";

function NavItems({ isModalView = false, isAdminView, router }) {
    return (
        <div
            className={`items-center justify-between w-full md:flex md:w-auto ${
                isModalView ? "" : "hidden"
            }`}
            id="nav-items"
        >
            <ul
                className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
                    isModalView ? "border-none" : "border border-gray-100"
                }`}
            >
                {isAdminView
                    ? adminNavOptions.map((item) => (
                          <li
                              className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                              key={item.id}
                              onClick={() => router.push(item.path)}
                          >
                              {item.label}
                          </li>
                      ))
                    : navOptions.map((item) => (
                          <li
                              className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                              key={item.id}
                              onClick={() => router.push(item.path)}
                          >
                              {item.label}
                          </li>
                      ))}
            </ul>
        </div>
    );
}

export default function Navbar() {
    const {
        user,
        isAuthUser,
        setIsAuthUser,
        setUser,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        showNavModal,
        setShowNavModal,
    } = useContext(GlobalContext);
    const [inputValue, setInputValue] = useState("");
    const pathName = usePathname();
    const router = useRouter();
    const [searchLoading, setSearchLoading] = useState(false);
    useEffect(() => {
        if (
            pathName !== "/admin-view/add-product" &&
            currentUpdatedProduct !== null
        )
            setCurrentUpdatedProduct(null);
    }, [pathName]);

    function handleLogout() {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove("token");
        localStorage.clear();
        router.push("/");
    }

    const isAdminView = pathName.includes("admin-view");
    const handleSearchLoading = (isLoading) => {
        setSearchLoading(isLoading);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    return (
        <>
            <nav className="bg-white  fixed w-full z-20 top-0 left-0 border-b border-gray-200">
                <div className="container gap-6 flex flex-wrap items-center justify-between mx-auto px-20 py-2 border-b">
                    <div
                        onClick={() => router.push("/")}
                        className="flex items-center cursor-pointer"
                    >
                        <img
                            alt="logo"
                            src="https://hstatic.net/744/1000088744/1000124945/logo.png?v=176"
                            className="w-[100px] object-cover object-center"
                        />
                    </div>

                    <div className="flex md:order-2 gap-2">
                        {!isAdminView && isAuthUser ? (
                            <Fragment>
                                <button
                                    className="button-custom"
                                    onClick={() => router.push("/account")}
                                >
                                    Account
                                </button>
                                <button
                                    className={"button-custom"}
                                    onClick={() => setShowCartModal(true)}
                                >
                                    Cart
                                </button>
                            </Fragment>
                        ) : null}
                        {user?.role === "admin" ? (
                            isAdminView ? (
                                <button
                                    className="button-custom"
                                    onClick={() => router.push("/")}
                                >
                                    Client View
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.push("/admin-view")}
                                    className="button-custom"
                                >
                                    Admin View
                                </button>
                            )
                        ) : null}
                        {isAuthUser ? (
                            <button
                                onClick={handleLogout}
                                className="button-custom"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push("/login")}
                                className="button-custom"
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
                                    fill-rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="w-full flex-1 flex justify-center items-center">
                        <NavItems router={router} isAdminView={isAdminView} />
                        <div
                            onMouseLeave={() => setInputValue("")}
                            className="relative z-10 max-w-[500px] min-w-[400px] flex items-center ml-6"
                        >
                            <button className="px-4 h-[46px] border-y border-l rounded-l-full border-[#444] border-opacity-30">
                                <BsSearch />
                            </button>
                            <input
                                value={inputValue}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="search"
                                className="border rounded-r-full outline-none px-4 h-[46px]  w-full border-[#444] border-opacity-30"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 ">
                                {inputValue ? (
                                    searchLoading ? (
                                        <div className="animate-spin">
                                            <AiOutlineLoading3Quarters className="text-blue-500 text-xl" />
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => {
                                                setInputValue("");
                                            }}
                                        >
                                            <AiOutlineClose className="text-red-500 text-xl cursor-pointer" />
                                        </div>
                                    )
                                ) : null}
                            </div>
                            <SearchModal
                                value={inputValue}
                                handleSearchLoading={handleSearchLoading}
                            />
                        </div>
                    </div>
                </div>
            </nav>
            <CommonModal
                showModalTitle={false}
                mainContent={
                    <NavItems
                        router={router}
                        isModalView={true}
                        isAdminView={isAdminView}
                    />
                }
                show={showNavModal}
                setShow={setShowNavModal}
            />
            {showCartModal && <CartModal />}
            <Notification />
        </>
    );
}
