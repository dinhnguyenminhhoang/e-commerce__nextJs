import Filter from "@/components/Filter/Filter.";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ProductByCategoryLayout({ children }) {
    return (
        <section className="flex gap-4">
            <Sidebar />
            {children}
        </section>
    );
}
