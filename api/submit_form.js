export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // ✅ Log to Vercel logs
    console.log("📩 Form Data Received:", data);

    return res.status(200).json({
      message: "Form submitted successfully ✅",
      receivedData: data,
    });
  } else {
    return res.status(405).json({ error: "Method not allowed ❌" });
  }
}
