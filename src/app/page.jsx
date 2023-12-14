"use client";
import Product from "@/components/CommonListing/Product";
import HotSaleSlide from "@/components/Slide";
import SlidePoster from "@/components/Slide/slidePoster";
import { GlobalContext } from "@/context";
import { getAllPoster } from "@/service/poster";
import {
    getAllAdminProducts,
    getProductsBySale,
    productByCategory,
} from "@/service/product";
import { zoomImg } from "@/utils/zoomImg";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { AiFillHome } from "@react-icons/all-files/Ai/AiFillHome";
export default function Home() {
    const { isAuthUser, pageLevelLoader, setPageLevelLoader } =
        useContext(GlobalContext);
    const [isVisible, setIsVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsSale, setProductsSale] = useState([]);
    const [productsMen, setProductsMen] = useState([]);
    const [productsWomen, setProductsWomen] = useState([]);
    const [productsKids, setProductsKids] = useState([]);
    const router = useRouter();
    async function getListOfProducts() {
        const res = await getProductsBySale();
        const resPoster = await getAllPoster();
        const resMen = await productByCategory("men");
        const resWomen = await productByCategory("women");
        const resKids = await productByCategory("kids");
        setPageLevelLoader(true);
        if (res.success) {
            setProducts(res.data);
        }
        if (resPoster.success) {
            setProductsSale(resPoster.data);
        }
        if (resMen.success) {
            setProductsMen(resMen.data);
        }
        if (resKids.success) {
            setProductsKids(resKids.data);
        }
        if (resWomen.success) {
            setProductsWomen(resWomen.data);
        }
        setPageLevelLoader(false);
    }
    useEffect(() => {
        getListOfProducts();
    }, []);
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
        <div className="flex min-h-screen max-w-full flex-col gap-4 items-center justify-between my-4">
            <div className="h-auto w-full">
                <HotSaleSlide listItem={productsSale} SlideItem={SlidePoster} />
            </div>
            <div className="grid px-4  mx-auto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                        Best Fashion Collection
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                        Quisquemos sodales suscipit tortor ditaemcos condimentum
                        de cosmo lacus meleifend menean diverra loremous.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            router.push("/product/listing/all-products")
                        }
                        className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    >
                        Explore Shop Collection
                    </button>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        alt="Explore Shop Collection"
                    />
                </div>
            </div>
            <div className="h-auto w-full">
                <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                    Best seling
                </h1>
                <HotSaleSlide
                    listItem={products}
                    SlideItem={Product}
                    numberSlide={4}
                />
            </div>
            <div className="px-4  mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                    <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                        <div className="max-w-md mx-auto text-center lg:text-left">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                    Summer Sale Collection
                                </h2>
                            </div>
                            <button
                                onClick={() =>
                                    router.push("/product/listing/all-products")
                                }
                                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                            >
                                Shop ALL
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-2 lg:py-8">
                        <ul className="grid grid-cols-2 gap-4">
                            {products && products.length
                                ? products
                                      .filter((item) => item.onSale === "yes")
                                      .splice(0, 2)
                                      .map((productItem) => (
                                          <li
                                              onClick={() =>
                                                  router.push(
                                                      `/product/${productItem._id}`
                                                  )
                                              }
                                              className="cursor-pointer h-full"
                                              key={productItem._id}
                                          >
                                              <div>
                                                  <img
                                                      src={productItem.imageUrl}
                                                      alt="Sale Product Item"
                                                      className="object-cover object-top w-full rounded aspect-square"
                                                  />
                                              </div>
                                              <div className="mt-3">
                                                  <h3 className="font-medium text-gray-900">
                                                      {productItem.name}
                                                  </h3>
                                                  <p className="mt-1 text-sm text-gray-800">
                                                      ${productItem.price}{" "}
                                                      <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                                                  </p>
                                              </div>
                                          </li>
                                      ))
                                : null}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 h-auto w-full">
                <div className="h-auto w-full">
                    <div className="flex items-center justify-between ">
                        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight leading-none">
                            Men's Fashion
                        </h1>
                        <button
                            onClick={() => router.push("/product/listing/men")}
                            className="border-none underline outline-none font-semibold text-[#4a4a4a] bg-transparent"
                        >
                            show all
                        </button>
                    </div>
                    <HotSaleSlide
                        listItem={productsMen}
                        SlideItem={Product}
                        numberSlide={4}
                    />
                </div>
                <div className="h-auto w-full">
                    <div className="flex items-center justify-between ">
                        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight leading-none">
                            Women's Fashion
                        </h1>
                        <button
                            onClick={() => router.push("/product/listing/men")}
                            className="border-none underline outline-none font-semibold text-[#4a4a4a] bg-transparent"
                        >
                            show all
                        </button>
                    </div>
                    <HotSaleSlide
                        listItem={productsWomen}
                        SlideItem={Product}
                        numberSlide={4}
                    />
                </div>
                <div className="h-auto w-full">
                    <div className="flex items-center justify-between ">
                        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight leading-none ">
                            kids fashion
                        </h1>
                        <button
                            onClick={() => router.push("/product/listing/men")}
                            className="border-none underline outline-none font-semibold text-[#4a4a4a] bg-transparent"
                        >
                            show all
                        </button>
                    </div>
                    <HotSaleSlide
                        listItem={productsKids}
                        SlideItem={Product}
                        numberSlide={4}
                    />
                </div>
            </div>
            <div className="px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
                        SHOP BY CATEGORY
                    </h2>
                </div>
                <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
                    <li>
                        <div className="relative block group">
                            <img
                                src="https://i.pinimg.com/564x/88/fb/e0/88fbe056c2ed4f126005db7b81ab40dc.jpg"
                                className="object-cover w-full aspect-square"
                            />
                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                <h3 className="text-xl font-medium text-white">
                                    KIDS
                                </h3>
                                <button
                                    onClick={() =>
                                        router.push("/product/listing/kids")
                                    }
                                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="relative block group">
                            <img
                                src="https://i.pinimg.com/564x/fe/b2/bd/feb2bd4ab7756b3ad861e84f50af9ca4.jpg"
                                className="object-cover w-full aspect-square"
                            />
                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                <h3 className="text-xl font-medium text-white">
                                    WOMEN
                                </h3>
                                <button
                                    onClick={() =>
                                        router.push("/product/listing/women")
                                    }
                                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                        <div className="relative block group">
                            <img
                                src="https://i.pinimg.com/564x/39/fa/7b/39fa7b4c4d07dbecf0ca4a7040e7c446.jpg"
                                className="object-cover w-full aspect-square"
                            />
                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                <h3 className="text-xl font-medium text-white">
                                    MEN
                                </h3>
                                <button
                                    onClick={() =>
                                        router.push("/product/listing/men")
                                    }
                                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-10 right-10 text-black text-2xl p-4 border cursor-pointer"
            >
                <AiFillHome />
            </div>
        </div>
    );
}
