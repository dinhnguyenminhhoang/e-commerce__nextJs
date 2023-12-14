"use client";
import CommonListing from "@/components/CommonListing";
import Filter from "@/components/Filter/Filter.";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import { getAllAdminProducts, productByFilter } from "@/service/product";
import { Fragment, useContext, useEffect, useState } from "react";

const AllProducts = () => {
    const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState("10");
    const getData = async () => {
        setPageLevelLoader(true);
        const getAllProducts = await getAllAdminProducts(limit);
        if (getAllProducts?.success) {
            setData(getAllProducts?.data);
            setPageLevelLoader(false);
        }
    };
    const handleLoadMore = (newLimit) => {
        setLimit(newLimit);
    };
    useEffect(() => {
        getData();
    }, [limit]);
    const handleFilter = async (formdata) => {
        setPageLevelLoader(true);
        const getProductsByFilter = await productByFilter({
            ...formdata,
        });
        if (getProductsByFilter?.success) {
            setData(getProductsByFilter?.data);
            setPageLevelLoader(false);
        }
    };
    if (pageLevelLoader) {
        return <PageLevelLoader pageLevelLoader={pageLevelLoader} />;
    }
    return (
        <div className="flex flex-col gap-2">
            <Filter handleFilter={handleFilter} />
            <CommonListing data={data} handleLoadMore={handleLoadMore} />
        </div>
    );
};

export default AllProducts;
