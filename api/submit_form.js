import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, organization, services } = req.body;

    if (!name || !email || !services) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // ✅ Log to Vercel (your current working part)
    console.log("📩 New submission received:", { name, email, organization, services });

    try {
      // ✅ Send email with Resend
      await resend.emails.send({
        from: "Website Form <onboarding@resend.dev>", // keep this as is
        to: "shifashiraguppi@gmail.com", // 👈 replace with YOUR email
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "N/A"}\nServices: ${services}`
      });

      return res.status(200).json({ message: "Form submitted successfully & email sent!" });
    } catch (error) {
      console.error("❌ Email sending error:", error);
      return res.status(500).json({ message: "Form submitted, but error sending email." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
