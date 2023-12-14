"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import {
    addNewAddress,
    deleteAddress,
    fetchAllAddresses,
    updateAddress,
} from "@/service/address";
import { addNewAddressFormControls } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { BiUserPin } from "react-icons/bi";
import { AiOutlineEdit, AiOutlineInfoCircle } from "react-icons/ai";
const Account = () => {
    const {
        user,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        setComponentLevelLoader,
        componentLevelLoader,
        pageLevelLoader,
        setPageLevelLoader,
    } = useContext(GlobalContext);
    const [showAddressFormData, setShowAddressFormData] = useState(false);
    const handleAddAddress = async () => {
        setComponentLevelLoader({ loading: true, id: "saving" });
        const res = await addNewAddress({
            ...addressFormData,
            userID: user?._id,
        });
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAddressFormData({
                fullName: "",
                city: "",
                country: "",
                postalCode: "",
                address: "",
            });
            setComponentLevelLoader({ loading: false, id: "" });
            extractAllAddress();
        } else {
            toast.error(res.error, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: "" });
            setAddressFormData({
                fullName: "",
                city: "",
                country: "",
                postalCode: "",
                address: "",
            });
        }
    };
    const handleDeleteAdress = async (id) => {
        setComponentLevelLoader({ loading: true, id: id });
        const res = await deleteAddress(id);
        setPageLevelLoader(true);

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: "" });
            setPageLevelLoader(false);

            extractAllAddress();
        } else {
            toast.error(res.error, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: "" });
        }
    };
    const [isUpdate, setIsUpdate] = useState(false);
    const handleUpdateAddress = async () => {
        setComponentLevelLoader({ loading: true, id: "saving" });
        setShowAddressFormData(true);
        const res = await updateAddress({
            ...addressFormData,
            userID: user?._id,
        });
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAddressFormData({
                fullName: "",
                city: "",
                country: "",
                postalCode: "",
                address: "",
            });
            setComponentLevelLoader({ loading: false, id: "" });
            extractAllAddress();
        } else {
            toast.error(res.error, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: "" });
            setAddressFormData({
                fullName: "",
                city: "",
                country: "",
                postalCode: "",
                address: "",
            });
        }
        setIsUpdate(false);
        setShowAddressFormData(false);
    };
    const extractAllAddress = async () => {
        setPageLevelLoader(true);
        const res = await fetchAllAddresses(user?._id);
        if (res.success) {
            setPageLevelLoader(false);
            setAddresses(res.data);
        }
    };
    useEffect(() => {
        if (user !== null) extractAllAddress();
    }, [user]);
    if (pageLevelLoader) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <PulseLoader
                    color={"#000000"}
                    loading={pageLevelLoader}
                    size={30}
                    data-testid="loader"
                />
            </div>
        );
    }
    return (
        <section>
            <div className="flex flex-col gap-4">
                <div className="w-full items-center flex flex-col gap-2 justify-center border-b p-4">
                    <BiUserPin size={40} />
                    <h1 className="text-slate-800 font-bold text-xl">
                        xin chào {user?.name}
                    </h1>
                </div>
                <div className="grid grid-cols-3 space-x-2">
                    <div className="col-span-1 shadow-md border p-4 rounded-md flex flex-col gap-2 items-center">
                        <AiOutlineInfoCircle size={30} className="mx-auto" />
                        <div className="flex gap-2 items-center cursor-pointer">
                            <span className="uppercase text-lg font-medium">
                                thông tin tài khoản
                            </span>
                            <AiOutlineEdit size={16} />
                        </div>
                        <div className="text-lg font-medium pl-4 text-slate-600">
                            <ul className="flex gap-2">
                                <li className="border-r pr-2">{user.name}</li>
                                <li>{user.email}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-2 shadow-md border flex gap-2">
                        <div className="w-1/2 border-r"></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow">
                    <div className="p-6 sm:p-12">
                        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row"></div>
                        <div className="flex flex-col flex-1">
                            <h4 className="text-lg font-semibold text-center md:text-left">
                                {user?.name}
                            </h4>
                            <p>{user?.email}</p>
                            <p>{user?.role}</p>
                        </div>
                        <button className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            View your order
                        </button>
                        <div className="mt-6">
                            <h1 className="font-bold text-lg">Your address:</h1>
                            <div className="mt-4 flex flex-col gap-4">
                                {addresses?.length ? (
                                    addresses.map((item) => (
                                        <div
                                            className="border p-6"
                                            key={item._id}
                                        >
                                            <p>Name: {item.fullName}</p>
                                            <p>address: {item.address}</p>
                                            <p>City: {item.city}</p>
                                            <p>country: {item.country}</p>
                                            <p>postalCode: {item.postalCode}</p>
                                            <button
                                                onClick={() => {
                                                    setShowAddressFormData(
                                                        !showAddressFormData
                                                    );
                                                    setAddressFormData({
                                                        ...item,
                                                    });
                                                    setIsUpdate(true);
                                                    setComponentLevelLoader({
                                                        loading: true,
                                                        id: item?._id + 9999999,
                                                    });
                                                }}
                                                className="mt-5 mr-2 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                            >
                                                {componentLevelLoader &&
                                                componentLevelLoader.loading &&
                                                componentLevelLoader.id ===
                                                    item._id + +9999999 ? (
                                                    <ComponentLevelLoader
                                                        text={"updating..."}
                                                        color={"#fff"}
                                                        loading={
                                                            componentLevelLoader &&
                                                            componentLevelLoader.loading
                                                        }
                                                    />
                                                ) : (
                                                    "update"
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteAdress(item._id)
                                                }
                                                className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                            >
                                                {componentLevelLoader &&
                                                componentLevelLoader.loading &&
                                                componentLevelLoader.id ===
                                                    item._id ? (
                                                    <ComponentLevelLoader
                                                        text={"deleting..."}
                                                        color={"#fff"}
                                                        loading={
                                                            componentLevelLoader &&
                                                            componentLevelLoader.loading
                                                        }
                                                    />
                                                ) : (
                                                    "delete"
                                                )}
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p>
                                        no address found! Please add a new
                                        address below
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() =>
                                    setShowAddressFormData(!showAddressFormData)
                                }
                                className="mt-2 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                            >
                                {showAddressFormData
                                    ? "Hide addres from"
                                    : "add new address"}
                            </button>
                        </div>
                        {showAddressFormData && (
                            <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                                    {addNewAddressFormControls.map(
                                        (addressControl) =>
                                            addressControl.componentType ===
                                            "input" ? (
                                                <InputComponent
                                                    key={addressControl.id}
                                                    lable={addressControl.label}
                                                    placeholder={
                                                        addressControl.placeholder
                                                    }
                                                    type={addressControl.type}
                                                    value={
                                                        addressFormData[
                                                            addressControl.id
                                                        ]
                                                    }
                                                    onChange={(e) => {
                                                        setAddressFormData({
                                                            ...addressFormData,
                                                            [addressControl.id]:
                                                                e.target.value,
                                                        });
                                                    }}
                                                />
                                            ) : null
                                    )}
                                </div>
                                <button
                                    onClick={
                                        isUpdate
                                            ? handleUpdateAddress
                                            : handleAddAddress
                                    }
                                    className="mt-2 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                >
                                    {componentLevelLoader &&
                                    componentLevelLoader.loading &&
                                    componentLevelLoader.id === "saving" ? (
                                        <ComponentLevelLoader
                                            text={"saving"}
                                            color={"#ffffff"}
                                            loading={
                                                componentLevelLoader &&
                                                componentLevelLoader.loading
                                            }
                                        />
                                    ) : (
                                        "save"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Notification />
        </section>
    );
};

export default Account;
