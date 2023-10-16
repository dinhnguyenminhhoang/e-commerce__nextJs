"use client";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { deleteAProduct, getAllAdminProducts } from "@/service/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const ProductButtons = ({ item }) => {
    const {
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        componentLevelLoader,
        setComponentLevelLoader,
    } = useContext(GlobalContext);
    const pathName = usePathname();
    const router = useRouter();
    const isAdminView = pathName.includes("admin-view");
    const handleDeleteProduct = async (item) => {
        setComponentLevelLoader({ loading: true, id: item._id });

        const res = await deleteAProduct(item._id);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message), { position: toast.POSITION.TOP_RIGHT };
            router.refresh();
        } else {
            setComponentLevelLoader({ loading: true, id: item._id });
            toast.error(res.message), { position: toast.POSITION.TOP_RIGHT };
        }
    };
    return isAdminView ? (
        <>
            <button
                onClick={() => {
                    setCurrentUpdatedProduct(item);
                    router.push("/admin-view/add-product");
                }}
                className="text-white mt-1.5 flex w-full justify-center bg-black px-5 py-3  text-xs font-medium uppercase tracking-wide"
            >
                update
            </button>
            <button
                onClick={() => handleDeleteProduct(item)}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                {componentLevelLoader &&
                componentLevelLoader.loading &&
                item._id === componentLevelLoader.id ? (
                    <ComponentLevelLoader
                        text={"Deleting Product"}
                        color={"#ffffff"}
                        loading={
                            componentLevelLoader && componentLevelLoader.loading
                        }
                    />
                ) : (
                    "DELETE"
                )}
            </button>
        </>
    ) : (
        <>
            <button className="text-white mt-1.5 flex w-full justify-center bg-black px-5 py-3  text-xs font-medium uppercase tracking-wide">
                Add cart
            </button>
        </>
    );
};

export default ProductButtons;
