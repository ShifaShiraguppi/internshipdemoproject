// api/submit_form.js
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    // Parse incoming data
    const { name, email, organization, services } = req.body;

    // Log data to Vercel runtime logs
    console.log("📩 New Form Submission:", { name, email, organization, services });

    // Check if required fields exist
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    // (Optional) here you could add email sending / database storing logic

    // Always return a response
    return res.status(200).json({
      success: true,
      message: "Form submitted successfully ✅",
      data: { name, email, organization, services }
    });

  } catch (error) {
    console.error("❌ Error in API:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
