import {useCallback, useRef, useState} from "react";

import imgSampleWhite from "../../assets/img_sample_white.png";

/**
 * 로컬에 있는 이미지 파일을 URL 형태로 웹 브라우저에 띄우는 역할
 */
const UploadSpaceImage = () => {
    const imgInputRef = useRef<HTMLInputElement | null>(null);
    const previewImgContainer = document.querySelector(".create-space-preview-img") as HTMLElement;
    const [imgFileUrl, setImgFileUrl] = useState("");

    const fileTypes = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon"
    ];

    /**
     * 이미지 파일의 형식이 올바른지 검증한다.
     */
    function validFileType(file: File) {
        return fileTypes.includes(file.type);
    }

    /**
     * 장치 관리자 창에서 이미지를 선택했을 때 발생시키는 콜백 함수
     */
    const onUploadPreviewImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        console.log(`imgFileUrl: ${imgFileUrl}`);

        // 기존에 이미 있던 이미지를 삭제한다.
        while (previewImgContainer !== null && previewImgContainer.firstChild) {
            previewImgContainer.removeChild(previewImgContainer.firstChild);
        }

        if (!e.target.files) {
            return;
        }

        // 선택한 이미지 파일을 가져온다.
        const file = (e.target.files as FileList)[0];

        console.log(`File name: ${file.name}`);

        if (validFileType(file)) {
            // 만약 선택한 이미지 파일이 이미지 형식에 맞는 파일이라면 URL을 생성해준다.
            const url = URL.createObjectURL(file);

            // 생성한 URL을 프리뷰 형태로 보여주고자 하는 이미지 영역에 띄우기 위해 state 변수에 넣어준다.
            setImgFileUrl(url);
        }

    }, [previewImgContainer]);

    /**
     * 업로드한 이미지를 삭제 및 초기화한다.
     */
    const onDeletePreviewImage = () => {
        if (imgFileUrl !== "") {
            // 이미지 URL을 무효화시킨다.
            URL.revokeObjectURL(imgFileUrl);

            // 이미지 URL을 먼저 빈 문자열로 설정한다.
            setImgFileUrl("");
        }
    }

    return (
        <div className="create-space-img-container">

            <img id="space-preview-img"
                 className="create-space-preview-img"
                 src={imgFileUrl === "" ? imgSampleWhite : imgFileUrl}
                 alt="Space preview image"/>

            <div className="create-space-img-btn-container">

                {/* Upload 버튼을 누르면 장치 관리자 창이 열리도록 한다. */}

                <label htmlFor="create-space-img-upload-btn" className="create-space-img-upload-btn">Upload</label>

                <input
                    id="create-space-img-upload-btn"
                    type="file"
                    accept="image/*"
                    name="Space profile"
                    ref={imgInputRef}
                    onChange={onUploadPreviewImage}
                    key={imgFileUrl}
                    style={{opacity: 0}}
                />

                {/* 업로드한 이미지를 삭제한다. */}
                <button className="create-space-img-remove-btn" onClick={onDeletePreviewImage}>
                    Remove
                </button>

            </div>

        </div>
    )
}

export default UploadSpaceImage;
