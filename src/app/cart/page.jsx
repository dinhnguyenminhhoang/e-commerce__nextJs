"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/service/cart";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
const Cart = () => {
    const router = useRouter();
    const {
        user,
        setCartItems,
        cartItems,
        pageLevelLoader,
        setPageLevelLoader,
        setComponentLevelLoader,
        componentLevelLoader,
    } = useContext(GlobalContext);
    const extractAllCartItems = async () => {
        setPageLevelLoader(true);
        const res = await getAllCartItems(user?._id);

        if (res.success) {
            const updatedData =
                res.data && res.data.length
                    ? res.data.map((item) => ({
                          ...item,
                          productID: {
                              ...item.productID,
                              price:
                                  item.productID.onSale === "yes"
                                      ? parseInt(
                                            (
                                                item.productID.price -
                                                item.productID.price *
                                                    (item.productID.priceDrop /
                                                        100)
                                            ).toFixed(2)
                                        )
                                      : item.productID.price,
                          },
                      }))
                    : [];
            setCartItems(updatedData);
            setPageLevelLoader(false);
            localStorage.setItem("cartItems", JSON.stringify(updatedData));
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
        <CommonCart
            cartItems={cartItems}
            handleDeleteCartItem={handleDeleteCartItem}
            componentLevelLoader={componentLevelLoader}
        />
    );
};

export default Cart;
