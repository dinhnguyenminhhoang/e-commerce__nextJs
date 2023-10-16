"use client";

import ProductButtons from "./ProductButtons";
import ProdcutTile from "./ProductTile";

const CommonListing = ({ data }) => {
    return (
        <section className="bg-white py-12 sm:py-6">
            <div className="mx-auto max-w-screen-xl px-4 ms:px-6 lg:px-8">
                <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:ml-16">
                    {data?.length > 0 &&
                        data.map((item) => (
                            <article
                                key={item._id}
                                className="relative flex flex-col overflow-hidden border cursor-pointer"
                            >
                                <ProdcutTile item={item} />
                                <ProductButtons item={item} />
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default CommonListing;
