"use client";
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);
export default function GlobalSate({ children }) {
    const [showNavModal, setShowNavModal] = useState(false);
    const [commonLoader, setCommonLoader] = useState(false);
    const [isAuthUer, setIsAuthUer] = useState(null);
    const [user, setUser] = useState(null);
    return (
        <GlobalContext.Provider
            value={{
                showNavModal,
                setShowNavModal,
                commonLoader,
                setCommonLoader,
                isAuthUer,
                setIsAuthUer,
                user,
                setUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
