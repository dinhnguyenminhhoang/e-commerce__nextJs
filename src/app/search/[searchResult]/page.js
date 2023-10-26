"use client";
import Product from "@/components/CommonListing/Product";
import { searchProduct } from "@/service/product";

const searchResult = async ({ params }) => {
    const data = await searchProduct(params.searchResult);
    return (
        <div className="flex flex-col gap-6">
            <div className="mt-8 text-2xl">
                <h1>your search results ({params.searchResult})</h1>
            </div>
            <div className="grid grid-cols-12">
                {data?.data?.length &&
                    data.data.map((product) => (
                        <div className="col-span-3" key={product._id}>
                            <Product data={product} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default searchResult;
