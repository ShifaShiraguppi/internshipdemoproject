// /api/submit_form.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, organization, services, message } = req.body || {};

  // Basic validation (same as before)
  if (!name || !email || !services) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  const payload = {
    name,
    email,
    organization: organization || "",
    services,
    message: message || ""
  };

  // ✅ Always log (this is what you already had working)
  console.log("📩 Form Data Received:", payload);

  // ✅ Try to send the email, but NEVER break the response if it fails
  try {
    // Dynamic import so we don't need ESM everywhere
    const { Resend } = await import("resend");
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ RESEND_API_KEY is missing. Skipping email send.");
    } else {
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Website Form <onboarding@resend.dev>",   // leave as-is for dev
        to: "shifashiraguppi@gmail.com",                 // <— your email here
        subject: "New Contact Form Submission",
        text:
`New submission:
Name: ${name}
Email: ${email}
Organization: ${organization || "—"}
Services: ${services}
Message: ${message || "—"}`
      });

      console.log("📧 Email sent via Resend");
    }
  } catch (err) {
    console.error("❌ Email sending failed (but form still OK):", err?.message || err);
  }

  // ✅ Always return success to the browser
  return res.status(200).json({ message: "Form submitted successfully ✅" });
}
