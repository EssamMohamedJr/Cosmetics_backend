import multer from "multer";

export function fileUpload(customFile=[]) {
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (customFile.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb('in-valid formate', false)
        }

    }
    const upload = multer({ fileFilter,storage })
    return upload
}