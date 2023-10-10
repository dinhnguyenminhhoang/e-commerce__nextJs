"use client";

import InputComponent from "@/components/FormElement/InputComponent";
import SelectComponent from "@/components/FormElement/SelectComponent";
import { registerNewUsre } from "@/service/register";
import { registrationFormControls } from "@/utils";
import Link from "next/link";
import { useState } from "react";

const isRegister = false;
const initFormData = {
    name: "",
    email: "",
    password: "",
    role: "",
};
const register = () => {
    const [formData, setFormData] = useState(initFormData);
    const isFormVaid = () => {
        return formData &&
            formData.name &&
            formData.name.trim() !== "" &&
            formData.email &&
            formData.email.trim !== "" &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    };
    const handleRegister = async () => {
        const data = await registerNewUsre(formData);
        console.log("data", data);
    };
    console.log(formData);
    return (
        <div className="bg-white relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex justify-center items-center w-full pr-10 pl-10 lg:flex-row flex-col">
                    <div className="w-full mt-10 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pl-10 pb-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl text-center font-medium font-serif">
                                {isRegister
                                    ? "Registration Successfull"
                                    : "Sing up for an account"}
                            </p>
                            {isRegister ? (
                                <button className="inline-flex w-full justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
                                    Login
                                </button>
                            ) : (
                                <div className="w-full mt-6 mb-0 ml-0 relative space-y-6">
                                    {registrationFormControls.map(
                                        (controlItem) =>
                                            controlItem.componentType ===
                                            "input" ? (
                                                <InputComponent
                                                    key={controlItem.id}
                                                    type={controlItem.type}
                                                    placeholder={
                                                        controlItem.placeholder
                                                    }
                                                    lable={controlItem.label}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            [controlItem.id]:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    value={
                                                        formData[controlItem.id]
                                                    }
                                                />
                                            ) : controlItem.componentType ===
                                              "select" ? (
                                                <SelectComponent
                                                    key={controlItem.id}
                                                    option={controlItem.options}
                                                    lable={controlItem.label}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            [controlItem.id]:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    value={
                                                        formData[controlItem.id]
                                                    }
                                                />
                                            ) : null
                                    )}
                                    <button
                                        disabled={!isFormVaid()}
                                        className="disabled:bg-[#aaa] inline-flex w-full justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                        onClick={handleRegister}
                                    >
                                        register
                                    </button>
                                    <div className="flex gap-2 justify-end items-center text-sm">
                                        <span>You have an account ?</span>
                                        <Link
                                            href="/login"
                                            className="text-red-600 underline"
                                        >
                                            login
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default register;
