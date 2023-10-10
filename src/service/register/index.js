export const registerNewUsre = async (formdata) => {
    try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formdata),
        });
        const findlData = res.json();
        return findlData;
    } catch (error) {
        console.log("err from server", error);
    }
};
