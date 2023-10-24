"use client";
import Contact from "./Contact";
import FooterItem from "./footerItem";

const Footer = () => {
    const dataItem = [
        {
            heading: "Tổng đài hỗ trợ miễn phí",
            data: [
                {
                    title: "Gọi mua hàng 1800.2097 (7h30 - 22h00)",
                },
                {
                    title: "Gọi khiếu nại 1800.2063 (8h00 - 21h30)",
                },
                {
                    title: "Gọi bảo hành 1800.2064 (8h00 - 21h00)",
                },
            ],
        },
        {
            heading: "Thông tin và chính sách",
            data: [
                {
                    title: "Mua hàng và thanh toán Online",
                },
                {
                    title: "Mua hàng trả góp Online",
                },
                {
                    title: "Chính sách giao hàng",
                },
                {
                    title: "Tra điểm Smember",
                },
                {
                    title: "Xem ưu đãi Smember",
                },
                {
                    title: "Xem ưu đãi Smember",
                },
            ],
        },
        {
            heading: "Dịch vụ và thông tin khác",
            data: [
                {
                    title: "Khách hàng doanh nghiệp (B2B)",
                },
                {
                    title: "Ưu đãi thanh toán",
                },
                {
                    title: "Quy chế hoạt động",
                },
                {
                    title: "Chính sách Bảo hành",
                },
                {
                    title: "Liên hệ hợp tác kinh doanh",
                },
                {
                    title: "Tuyển dụng",
                },
            ],
        },
    ];
    const contactData = [
        {
            src: "https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-youtube.png",
        },
        {
            src: "https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-facebook.png",
        },
        {
            src: "https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-instagram.png",
        },
        {
            src: "https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-tiktok.png",
        },
        {
            src: "https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-zalo.png",
        },
    ];
    return (
        <div className="shadow-custom mt-10 pb-10 hidden md:block border-t">
            <div className="md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4 flex justify-between items-start py-2 gap-4  ">
                {dataItem?.length > 0 &&
                    dataItem.map((item, index) => (
                        <FooterItem
                            data={item.data}
                            heading={item.heading}
                            key={index}
                        />
                    ))}
                <div>
                    <Contact data={contactData} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
