import { diskStorage } from "multer";

export const multerConfig = {
    storage: diskStorage({
        destination: './public/products/img',
        filename: (req, res, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const pointPosition = res.originalname.indexOf('.');
            const fileLength = res.originalname.length;
            const fullFileName = `${uniqueSuffix}${res.originalname.slice(pointPosition, fileLength)}`
            cb(null, fullFileName)
        }
    })
}