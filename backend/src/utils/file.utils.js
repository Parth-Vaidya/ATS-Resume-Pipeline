import { randomUUID } from "node:crypto";
import path from "node:path";

export const generateUniqueFilename = (originalname) => {
    const extension = path.extname(originalname).toLowerCase();
    return `${randomUUID()}${extension}`;
};