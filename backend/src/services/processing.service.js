import { spawn } from "child_process";
import path from "path";

export const processResume = (
    pdfPath,
    requirements,
    scoringConfig
) => {
    return new Promise((resolve, reject) => {

        const pythonPath = path.resolve(
            process.cwd(),
            "../processor/.venv/Scripts/python.exe"
        );

        const pythonProcess = spawn(
            pythonPath,
            ["../processor/app/main.py"]
        );

        const input = JSON.stringify({
            pdf_path: pdfPath,
            requirements,
            scoring_config: scoringConfig
        });

        let output = "";
        let errorOutput = "";

        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on("close", (code) => {

            if (code !== 0) {
                return reject(
                    new Error(errorOutput || "Python process failed")
                );
            }

            try {
                const result = JSON.parse(output);
                resolve(result);
            } catch (error) {
                reject(
                    new Error("Invalid JSON returned by Python")
                );
            }
        });

        pythonProcess.stdin.write(input);
        pythonProcess.stdin.end();
    });
};