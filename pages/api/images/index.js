import { IncomingForm } from "formidable";
import fs from "fs";
import dbConnect from "../../../utils/dbConnect";
import Image from "../../../models/Image";

export const config = {
    api: {
        bodyParser: false, // Disables the default Next.js body parser
    },
};

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "POST") {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error parsing the form data." });
            }

            const file = files.image[0];
            if (!file) {
                return res.status(400).json({ message: "No image file uploaded." });
            }
        
            // Directly use the file path from the 'file' object
            const filePath = file.filepath;

            try {
                // Read the file into a Buffer
                const fileBuffer = fs.readFileSync(filePath);
                const base64String = fileBuffer.toString("base64");
                // Create a new image document using the Buffer
                const newImage = await Image.create({
                    name: file.originalFilename || "uploaded_image",
                    data: base64String,
                    contentType: file.mimetype,
                });

                // Remove the temporary file
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) console.error(unlinkErr);
                });

                // Respond with the saved image document
                res.status(201).json({ success: true, imageId: newImage._id });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error saving the image to the database" });
            }
        });
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
 
}
