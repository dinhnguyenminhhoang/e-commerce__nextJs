"use client";
import { MenuSidebar } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [active, setActive] = useState(pathname);
    return (
        <div className="flex flex-col gap-2 p-2 bg-white h-full w-1/5">
            <h1 className="relative font-normal text-lg text-slate-600 pb-2 after:content-[''] after:block after:w-[50px] after:h-[1px] after:absolute after:left-0 after:bottom-0 after:bg-[#555]">
                DANH MỤC
            </h1>
            <div className={`flex flex-col gap-1 text-sm  font-bold `}>
                {MenuSidebar.map((item) => (
                    <div
                        onClick={() => {
                            router.push(item?.link);
                            setActive(item?.link);
                        }}
                        key={item.id}
                        className={`py-2 border-b last:border-none cursor-pointer ${
                            active === item?.link
                                ? "text-black"
                                : "text-slate-600"
                        }`}
                    >
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Sidebar;
