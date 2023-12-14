"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { login } from "@/service/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormdata = {
    email: "",
    password: "",
};

export default function Login() {
    const [formData, setFormData] = useState(initialFormdata);
    const {
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
    } = useContext(GlobalContext);

    const router = useRouter();

    function isValidForm() {
        return formData &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    }

    async function handleLogin() {
        setComponentLevelLoader({ loading: true, id: "" });
        const res = await login(formData);
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(true);
            setUser(res?.finalData?.user);
            setFormData(initialFormdata);
            Cookies.set("token", res?.finalData?.token);
            localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
            setComponentLevelLoader({ loading: false, id: "" });
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(false);
            setComponentLevelLoader({ loading: false, id: "" });
        }
    }

    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser]);

    return (
        <div className="bg-white relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex h-[80vh] flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-1/2">
                        <div className="flex  flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full  text-4xl font-medium text-center font-serif">
                                Login
                            </p>
                            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                {loginFormControls.map((controlItem) =>
                                    controlItem.componentType === "input" ? (
                                        <InputComponent
                                            type={controlItem.type}
                                            placeholder={
                                                controlItem.placeholder
                                            }
                                            label={controlItem.label}
                                            value={formData[controlItem.id]}
                                            onChange={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    [controlItem.id]:
                                                        event.target.value,
                                                });
                                            }}
                                        />
                                    ) : null
                                )}
                                <button
                                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                                    disabled={
                                        !isValidForm() ||
                                        componentLevelLoader.loading
                                    }
                                    onClick={handleLogin}
                                >
                                    {componentLevelLoader &&
                                    componentLevelLoader.loading ? (
                                        <ComponentLevelLoader
                                            text={"Logging In"}
                                            color={"#ffffff"}
                                            loading={
                                                componentLevelLoader &&
                                                componentLevelLoader.loading
                                            }
                                        />
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                                <div className="flex gap-2 text-sm mt-4 text-center justify-center">
                                    <span>You don't have account ? </span>
                                    <Link
                                        href="/register"
                                        className="text-red-500 underline"
                                    >
                                        register
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
}
