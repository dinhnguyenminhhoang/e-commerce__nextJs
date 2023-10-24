import Cookies from "js-cookie";

export const addNewPoster = async (formData) => {
    try {
        const response = await fetch("/api/admin/add-poster", {
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
export const getAllPoster = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/admin/all-posters", {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};
