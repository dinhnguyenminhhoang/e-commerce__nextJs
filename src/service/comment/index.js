import Cookies from "js-cookie";

export const addToComment = async (formData) => {
    try {
        const res = await fetch("/api/comment/add-to-comment", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};
export const getAllComment = async (id) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/comment/all-comments?id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteFromComment = async (id) => {
    try {
        const res = await fetch(`/api/comment/delete-from-comment?id=${id}`, {
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
