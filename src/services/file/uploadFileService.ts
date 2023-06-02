import instances from "../axiosInstance";

/**
 * File 업로드를 위한 axios 인스턴스 (multer)
 */
const uploadImgService = async (e: any) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {

        return await instances.IMG_INSTANCE.post("/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

    } catch (error) {

        console.error(error);
        throw new Error("이미지 업로드에 실패하였습니다.");

    }
}

export default uploadImgService;
