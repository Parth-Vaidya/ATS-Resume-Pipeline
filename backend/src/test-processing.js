import { processResume } from "./services/processing.service.js";

const result = await processResume(
    "../storage/1789407216819-202411095_Resume.pdf",
    {
        required_skills: ["Node.js", "PostgreSQL"],
        preferred_skills: ["Docker"],
        languages: ["JavaScript"],
        keywords: ["REST API", "backend"]
    },
    {
        required_skills: 50,
        preferred_skills: 20,
        languages: 15,
        keywords: 15
    }
);

console.log(result);