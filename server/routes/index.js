let express = require("express");
let router = express.Router();
let path = require("path");
let multer = require("multer");

const cors = require("cors");
router.use(cors());

router.get("/", function(req, res) {

    res.send({greeting: "Hello React x Node.js"});

});

// Multer의 DiskStorage 엔진을 이용해서 파일 업로드
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // uploads라는 static 디렉토리에 파일들이 저장되도록 경로를 지정한다.
        callback(null, "public/images/");
        // callback(null, "src/assets/uploads/");
    },
    filename: (req, file, callback) => {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);

        // 파일 이름의 중복을 막기 위해 Date.now() 메서드를 사용한다.
        // 만약 저장하려는 파일 이름을 수정하려면 여기를 수정하면 된다.
        callback(null, basename + "-" + Date.now() + extension);
    },
});

// fileFilter: (req, file, callback) => {
//     const ext = path.extname(file.originalname);
//
//     if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
//         return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//
//     callback(null, true);
// }

const upload = multer({ storage: storage }).single("file");

/**
 * Router
 * 파일이 업로드될 기본 경로
 */
router.post("/uploads", (req, res) => {

    /**
     * 여기서 single은 오직 하나의 파일만 upload 할 수 있는 걸 의미한다.
     * single 안에 있는 이름은 HTML 태그의 name이다.
     * multer가 알아서 destination의 경로에 업로드한다.
     */
    upload(req, res, (err) => {

        if (err) {
            console.log(`error: ${err}`);

            return res.json({
                success: false,
                err,
            });
        }

        return res.json({
            success: true,
            url: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});

module.exports = router;
