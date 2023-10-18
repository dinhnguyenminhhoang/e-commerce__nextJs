"use client";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/service/cart";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CartModal = () => {
    const {
        showCartModal,
        setShowCartModal,
        user,
        cartItems,
        setCartItems,
        componentLevelLoader,
        setComponentLevelLoader,
    } = useContext(GlobalContext);
    const router = useRouter();
    const extractAllCartItems = async () => {
        const res = await getAllCartItems(user._id);
        if (res.success) {
            setCartItems(res.data);
            localStorage.setItem("cartItems", JSON.stringify(res.data));
        }
    };
    useEffect(() => {
        if (user !== null) extractAllCartItems();
    }, [user]);
    const handleDeleteCartItem = async (id) => {
        setComponentLevelLoader({ loading: true, id: id });
        const res = await deleteFromCart(id);
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: "" });
            extractAllCartItems();
        } else {
            toast.error(res.error, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: "" });
        }
    };
    return (
        <CommonModal
            showButtons={true}
            show={showCartModal}
            setShow={setShowCartModal}
            mainContent={
                cartItems && cartItems.length ? (
                    <ul role="list" className="-my-6 divide-y divide-gray-300">
                        {cartItems.map((cartItem) => (
                            <li key={cartItem.id} className="flex py-6">
                                <div
                                    onClick={() => {
                                        router.push(
                                            `/product/${cartItem.productID._id}`
                                        );
                                        setShowCartModal(false);
                                    }}
                                    className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer"
                                >
                                    <img
                                        src={
                                            cartItem &&
                                            cartItem.productID &&
                                            cartItem.productID.imageUrl
                                        }
                                        alt="Cart Item"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <a>
                                                    {cartItem &&
                                                        cartItem.productID &&
                                                        cartItem.productID.name}
                                                </a>
                                            </h3>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">
                                            $
                                            {cartItem &&
                                                cartItem.productID &&
                                                cartItem.productID.price}
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <button
                                            type="button"
                                            className="font-medium text-yellow-600 sm:order-2"
                                            onClick={() =>
                                                handleDeleteCartItem(
                                                    cartItem._id
                                                )
                                            }
                                        >
                                            {componentLevelLoader &&
                                            componentLevelLoader.loading &&
                                            componentLevelLoader.id ===
                                                cartItem._id ? (
                                                <ComponentLevelLoader
                                                    text={"Removing"}
                                                    color={"yellow"}
                                                    loading={
                                                        componentLevelLoader &&
                                                        componentLevelLoader.loading
                                                    }
                                                />
                                            ) : (
                                                "Remove"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex h-full justify-center items-center text-center text-xl">
                        <h1 className="">empty cart</h1>
                    </div>
                )
            }
            buttonComponent={
                <Fragment>
                    <button
                        type="button"
                        className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-sm font-medium uppercase tracking-wide"
                        onClick={() => {
                            setShowCartModal(false);
                            router.push("/cart");
                        }}
                    >
                        Go To Cart
                    </button>
                    <button
                        disabled={cartItems?.length < 1}
                        type="button"
                        onClick={() => {
                            router.push("/checkout");
                            setShowCartModal(false);
                        }}
                        className="disabled:opacity-50 mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-sm font-medium uppercase tracking-wide"
                    >
                        checkout
                    </button>
                    <div
                        onClick={() => {
                            setShowCartModal(false);
                            router.push("/product/listing/all-products");
                        }}
                        className="mt-6 flex justify-center text-center text-sm text-gray-600 cursor-pointer"
                    >
                        <button className="font-medium text-gray mr-2">
                            continue shopping
                        </button>
                        <span aria-hidden="true">&rarr;</span>
                    </div>
                </Fragment>
            }
        />
    );
};

export default CartModal;
