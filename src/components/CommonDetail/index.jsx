"use client";

import { GlobalContext } from "@/context";
import { addToCart } from "@/service/cart";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import Notification from "../Notification";
import { zoomImg } from "@/utils/zoomImg";
import { productByCategory } from "@/service/product";
import HotSaleSlide from "../slide";
import Product from "../CommonListing/Product";

const CommonDetail = ({ item }) => {
    const {
        setComponentLevelLoader,
        setShowCartModal,
        componentLevelLoader,
        user,
    } = useContext(GlobalContext);
    const [imgShown, setImgShown] = useState(true);
    const [similarProducts, setSimilarProducts] = useState([]);
    const imgRef = useRef();
    const mirrorRef = useRef();
    useEffect(() => {
        if (imgRef.current && mirrorRef.current)
            zoomImg(imgRef.current, 2, mirrorRef.current);
    }, [imgRef, mirrorRef]);
    const getProductSimilar = async () => {
        const res = await productByCategory(item.category);
        if (res.success) setSimilarProducts(res.data);
    };
    useEffect(() => {
        getProductSimilar();
    }, []);
    const handleAddCart = async (cartItem) => {
        setComponentLevelLoader({ loading: true, id: cartItem._id });
        const res = await addToCart({
            productID: cartItem._id,
            userID: user._id,
        });
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message), { position: toast.POSITION.TOP_RIGHT };
            setShowCartModal(true);
        } else {
            toast.error(res.message), { position: toast.POSITION.TOP_RIGHT };
            setComponentLevelLoader({ loading: false, id: "" });
            setShowCartModal(true);
        }
    };
    return (
        <section className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="lg:col-gap-12 xl:col-gap-16 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                    <div className="lg:col-span-3 lg:row-end-1">
                        <div className="lg:flex lg:items-start">
                            <div className="lg:order-2 lg:ml-5">
                                <div className="max-w-xl overflow-hidden rounded-lg">
                                    <img
                                        ref={imgRef}
                                        src={
                                            imgShown
                                                ? item?.imageUrl
                                                : item?.thumbnailUrl
                                        }
                                        className="h-full w-full max-w-full object-cover cursor-zoom-in"
                                        alt="product detail"
                                    />
                                    <div
                                        ref={mirrorRef}
                                        className={`
                                        hidden
                                          border
                                          z-10
                                          w-[150px] h-[150px]
                                        rounded-full fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover`}
                                        style={{
                                            backgroundImage: `url(${
                                                imgShown
                                                    ? item?.imageUrl
                                                    : item?.thumbnailUrl
                                            })`,
                                            imageRendering: "crisp-edges",
                                            imageRendering:
                                                "-webkit-crisp-edges",
                                            imageRendering:
                                                "-webkit-optimize-contrast",
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                <div className="flex flex-row items-start lg:flex-col">
                                    <button
                                        type="button"
                                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                                    >
                                        <img
                                            onClick={() => {
                                                setImgShown(!imgShown);
                                            }}
                                            src={
                                                imgShown
                                                    ? item?.thumbnailUrl
                                                    : item?.imageUrl
                                            }
                                            className="h-full w-full object-cover object-top"
                                            alt="product detail"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {item?.name}
                        </h1>
                        <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-0 py-4 sm:flex-row sm:space-y-0">
                            <div className="flex gap-4 items-end">
                                <p
                                    className={`text-3xl font-bold ${
                                        item?.onSale === "yes"
                                            ? "line-through text-gray-500"
                                            : null
                                    }`}
                                >
                                    ${item?.price}
                                </p>
                                {item?.onSale === "yes" && (
                                    <p className="text-3xl text-red-600 font-bold">
                                        $
                                        {(
                                            (item?.price * item.priceDrop) /
                                            100
                                        ).toFixed(0)}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => handleAddCart(item)}
                                type="button"
                                className="mt-1.5 inline-block bg-black px-5 py-3 text-sm font-medium tracking-wide uppercase text-white"
                            >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                componentLevelLoader.id === item._id ? (
                                    <ComponentLevelLoader
                                        text={"adding to cart"}
                                        color={"#fff"}
                                        loading={
                                            componentLevelLoader &&
                                            componentLevelLoader.loading
                                        }
                                    />
                                ) : (
                                    "Add to cart"
                                )}
                            </button>
                        </div>
                        <ul className="mt-8 space-y-2 flex flex-col gap-2 mb-8">
                            <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                {`delivery: ${item?.deliveryInfo}`}
                            </li>
                            <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                {`cancel anytime`}
                            </li>
                        </ul>
                        <div className="lg:col-span-3">
                            <div className="border-b border-gray-400">
                                <nav className="flex gap-4">
                                    <a
                                        href="#"
                                        className="border-b-2 border-gray-900 text-sm font-medium "
                                    >
                                        Description
                                    </a>
                                </nav>
                            </div>
                            <div className="mt-4 flow-root sm:mt-4">
                                {item?.description}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-auto w-full mt-10">
                    <h1 className="max-w-2xl mb-2 text-lg font-extrabold tracking-tight leading-none md:text-2xl xl:text-4xl">
                        similar Products
                    </h1>
                    <HotSaleSlide
                        listItem={similarProducts}
                        SlideItem={Product}
                        numberSlide={4}
                    />
                </div>
            </div>
            <Notification />
        </section>
    );
};

export default CommonDetail;
