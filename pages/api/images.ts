import cloudinary from "../../utils/cloudinary";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const results = await cloudinary.v2.search
        .expression(`folder:anjar${req.query.folder}/*`)
        .sort_by("public_id", "desc")
        .max_results(400)
        .execute();

      res.status(200).json(results.resources);
    } catch (error) {
      res.status(500).json({ error: "Error fetching images" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}