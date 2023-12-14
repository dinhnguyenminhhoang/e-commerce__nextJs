"use client";

import { deleteAProduct } from "@/service/product";
import ProductButtons from "./ProductButtons";
import ProdcutTile from "./ProductTile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Notification from "../Notification";
import Product from "./Product";
import Filter from "../Filter/Filter.";

const CommonListing = ({ data, handleLoadMore }) => {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, []);
    const handleLoadMoreChil = () => {
        handleLoadMore(data.length + 10);
    };
    return (
        <section className="bg-white">
            <div className="mx-auto">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2">
                    {data?.length > 0 &&
                        data.map((item) => (
                            <div
                                key={item._id}
                                className="relative flex flex-col cursor-pointer"
                            >
                                <Product data={item} />
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleLoadMoreChil}
                    className="px-4 py-2 border text-slate-800 rounded-md font-medium hover:border-black hover:text-black transition-all duration-200"
                >
                    xem thêm 10 sản phẩm
                </button>
            </div>
            <Notification />
        </section>
    );
};

export default CommonListing;
