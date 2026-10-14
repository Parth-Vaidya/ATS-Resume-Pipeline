import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { generateUniqueFilename } from "../utils/file.utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.resolve(__dirname, "../../../storage");

fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

filename: (req, file, cb) => {
    cb(null, generateUniqueFilename(file.originalname));
}
});

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension !== ".pdf") {
        return cb(new Error("Only PDF files are allowed"));
    }

    cb(null, true);
};

export const uploadResumes = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});