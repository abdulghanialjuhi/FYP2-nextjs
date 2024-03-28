// pages/api/images/[id].js

import dbConnect from "../../../utils/dbConnect";
import Image from "../../../models/Image";

export default async function handler(req, res) {
  await dbConnect();

    const {
      query: { id },
      method,
    } = req;

    if (method === "GET") {
      try {
        const image = await Image.findById(id);

        if (!image) {
          return res
            .status(404)
            .json({ success: false, message: "Image not found" });
        }

        // Assuming 'data' in your image document is a Base64 encoded string
        const base64Data = image.data;
        // Convert Base64 string to binary data
        const imgBuffer = Buffer.from(base64Data, "base64");
        const contentType = image.contentType;

        // Set the Content-Type and serve the image
        res.writeHead(200, {
          "Content-Type": contentType,
          "Content-Length": imgBuffer.length,
        });
        res.end(imgBuffer);
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Invalid request" });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }

}
