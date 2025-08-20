import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, organization, services, message } = req.body;

    if (!name || !email || !services) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // ✅ Always log submission (your old working code)
    console.log("📩 New submission received:", { name, email, organization, services, message });

    try {
      // ✅ Try to send email (new code)
      await resend.emails.send({
        from: "Website Form <onboarding@resend.dev>", 
        to: "shifashiraguppi@gmail.com", // 👈 put YOUR email here
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nServices: ${services}\nMessage: ${message || "N/A"}`
      });

      return res.status(200).json({ message: "Form submitted successfully & email sent!" });
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      // ✅ Even if email fails, still return success for user
      return res.status(200).json({ message: "Form submitted successfully (email failed, but logged)." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
