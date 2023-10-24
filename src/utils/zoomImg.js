export const zoomImg = (imgRef, scop = 2, mirrorRef) => {
    console.log("hih");
    if (imgRef && mirrorRef) {
        imgRef.onmousemove = function (e) {
            mirrorRef.style.display = "block";

            const imgRect = imgRef.getBoundingClientRect();
            const clientX = e.clientX - imgRect.left;
            const clientY = e.clientY - imgRect.top;

            const percentX = (clientX / imgRect.width) * 100;
            const percentY = (clientY / imgRect.height) * 100;

            mirrorRef.style.top = `${e.clientY}px`;
            mirrorRef.style.left = `${e.clientX}px`;
            mirrorRef.style.backgroundSize = `${imgRect.width * scop}px ${
                imgRect.height * scop
            }px`;
            mirrorRef.style.backgroundPosition = `${percentX}% ${percentY}%`;
        };
        imgRef.onmouseleave = (e) => {
            mirrorRef.style.display = "none";
        };
    }
};
