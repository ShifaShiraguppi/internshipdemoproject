export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, organization, services } = req.body;

    return res.status(200).json({
      message: "Form submitted successfully!",
      data: { name, email, organization, services }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
