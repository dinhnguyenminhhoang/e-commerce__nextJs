import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
    try {
        const response = await fetch("/api/admin/add-product", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllAdminProducts = async (limit) => {
    try {
        if (!limit) limit = 10;
        const res = await fetch(
            `http://localhost:3000/api/admin/all-products?limit=${limit}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getProductsBySale = async () => {
    try {
        const res = await fetch(
            "http://localhost:3000/api/admin/product-by-sale",
            {
                method: "GET",
                cache: "no-store",
            }
        );
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};
export const updateAProduct = async (formData) => {
    try {
        const res = await fetch("/api/admin/update-product", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            cache: "no-store",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAProduct = async (id) => {
    try {
        const res = await fetch(`/api/admin/delete-product?id=${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};
export const productByCategory = async (id, limit) => {
    try {
        if (!limit) limit = 10;
        const res = await fetch(
            `http://localhost:3000/api/admin/product-by-category?id=${id}&limit=${limit}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};
export const productById = async (id) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/admin/product-by-id?id=${id}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};
export const searchProduct = async (id) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/admin/search-product?id=${id}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};
export const rateProduct = async (formData) => {
    try {
        const res = await fetch("/api/admin/rate-product", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            cache: "no-store",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};
export const productByFilter = async (formData) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/admin/product-by-filter?type=${formData.type}&sortPrice=${formData.sortPrice}&category=${formData.category}&search=${formData.search}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};
