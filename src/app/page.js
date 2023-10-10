"use client";
import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function Home() {
    const { isAuthUer } = useContext(GlobalContext);
    console.log(isAuthUer);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <span>hi</span>
        </main>
    );
}
