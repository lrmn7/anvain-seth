import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";

export default async function handler(req, res) {
  const { image } = req.query;

  try {
    const blurDataURL = await getBase64ImageUrl(image);
    res.status(200).json({ blurDataURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate blurDataURL" });
  }
}
