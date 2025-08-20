const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running fine 🚀" });
});

// Handle form submission
app.post("/submit_form", (req, res) => {
  const { name, email, organization, services } = req.body;

  if (!name || !email || !services) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  const newSubmission = {
    name,
    email,
    organization,
    services,
    submittedAt: new Date().toISOString()
  };

  const filePath = "submissions.json";
  let existingData = [];

  if (fs.existsSync(filePath)) {
    existingData = JSON.parse(fs.readFileSync(filePath));
  }

  existingData.push(newSubmission);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  console.log("📩 New submission received:", newSubmission);

  res.json({ message: "Form submitted successfully!", data: newSubmission });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
