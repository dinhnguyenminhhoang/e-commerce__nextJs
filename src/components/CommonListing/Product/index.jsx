import { useRouter } from "next/navigation";
import { Fragment } from "react";
import ProductButtons from "../ProductButtons";
import "./style.css";
import Animate from "@/components/Loader/Animate/Animate";
const Product = ({ data }) => {
    const router = useRouter();
    if (!data) return <Animate />;
    return (
        <div
            className={`relative el-wrapper border pt-1  mx-auto bg-white w-[275px]`}
        >
            <div
                onClick={() => router.push(`/product/${data?._id}`)}
                className="w-full relative  overflow-hidden text-center cursor-pointer"
            >
                <img className="img" src={data?.imageUrl} alt="" />
                <div className="img-info">
                    <div className="info-inner">
                        <span className="p-name">{data?.name}</span>
                        <span className="p-company">Yeezy</span>
                    </div>
                    <div className="a-size">
                        Available sizes:
                        {data?.sizes.map((size) => size.label).join(" - ")}
                    </div>
                </div>
            </div>

            <div className="box-down mt-2 w-full">
                <div className="h-bg">
                    <div className="h-bg-inner"></div>
                </div>

                <div className="cart">
                    {data.onSale === "yes" ? (
                        <Fragment>
                            <span className="price price-sale text-[#686767] line-through left-[40%]">
                                ${data.price}
                            </span>
                            <span className="price  text-red-500 left-[60%]">
                                $
                                {Math.floor(
                                    Number(data.price) -
                                        (Number(data.price) *
                                            Number(data.priceDrop)) /
                                            100
                                )}
                            </span>
                        </Fragment>
                    ) : (
                        <span className="price text-black font-bold left-1/2">
                            ${data.price}
                        </span>
                    )}
                    <span className="add-to-cart">
                        <span className="txt">
                            <ProductButtons item={data} />
                        </span>
                    </span>
                </div>
            </div>
            {data.onSale === "yes" && (
                <div className="absolute top-4 left-4 px-4 py-1 bg-red-700 text-white rounded-full">
                    <span className="text-center font-bold text-sm">
                        Sale of ({data.priceDrop}%)
                    </span>
                </div>
            )}
        </div>
    );
};

export default Product;
