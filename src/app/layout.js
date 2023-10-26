import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import GlobalSate from "@/context";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Fashion shop",
    description: "Fashion shop",
    openGraph: {
        images: "https://hstatic.net/744/1000088744/1000124945/logo.png?v=176",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <GlobalSate>
                    <Navbar />
                    <main className="min-h-screen mt-[86px] md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4">
                        {children}
                    </main>
                    <Footer />
                </GlobalSate>
            </body>
        </html>
    );
}
