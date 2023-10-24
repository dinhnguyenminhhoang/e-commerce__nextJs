"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductTile({ item }) {
    const [isImage, setIsImage] = useState(true);
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/product/${item._id}`)}>
            <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52 group rounded-lg">
                <img
                    // onMouseMove={() =>
                    //     setTimeout(() => setIsImage(false), [400])
                    // }
                    // onMouseLeave={() =>
                    //     setTimeout(() => setIsImage(true), [400])
                    // }
                    src={isImage ? item.imageUrl : item.thumbnailUrl}
                    alt="Product image"
                    className="rounded-sm h-full w-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:object-bottom cursor-pointer"
                />
            </div>
            {item.onSale === "yes" ? (
                <div className="absolute top-0 m-2 rounded-full bg-black">
                    <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                        Sale
                    </p>
                </div>
            ) : null}
            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                    <p
                        className={`mr-3 text-sm font-semibold ${
                            item.onSale === "yes" ? "line-through" : ""
                        }`}
                    >{`$ ${item.price}`}</p>
                    {item.onSale === "yes" ? (
                        <p className="mr-3 text-sm font-semibold text-red-700">{`$ ${(
                            item.price -
                            item.price * (item.priceDrop / 100)
                        ).toFixed(2)}`}</p>
                    ) : null}
                    {item.onSale === "yes" ? (
                        <p className="mr-3 text-xs font-semibold">{`-(${item.priceDrop}%)off`}</p>
                    ) : null}
                </div>
                <h3 className="md-2 text-gray-400 text-sm">{item.name}</h3>
            </div>
        </div>
    );
}
