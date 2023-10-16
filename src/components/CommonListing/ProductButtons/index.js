"use client";

import { usePathname } from "next/navigation";

const ProductButtons = () => {
    const pathName = usePathname();
    const isAdminView = pathName.includes("admin-view");
    return isAdminView ? (
        <>
            <button className="text-white mt-1.5 flex w-full justify-center bg-black px-5 py-3  text-xs font-medium uppercase tracking-wide">
                update
            </button>
            <button className="text-white mt-1.5 flex w-full justify-center bg-black px-5 py-3  text-xs font-medium uppercase tracking-wide">
                delete
            </button>
        </>
    ) : (
        <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3  text-xs font-medium uppercase tracking-wide">
                Add product
            </button>
        </>
    );
};

export default ProductButtons;
