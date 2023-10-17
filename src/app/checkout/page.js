"use client";

import { GlobalContext } from "@/context";
import { useContext } from "react";

const checkout = () => {
    const { cart } = useContext(GlobalContext);
    return <div></div>;
};

export default checkout;
