export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, organization, services } = req.body;

    if (!name || !email || !services) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Here you can integrate email, Google Sheets, or database
    // For now, we just send a success response
    console.log("📩 New submission received:", { name, email, organization, services });

    return res.status(200).json({ message: "Form submitted successfully!" });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
