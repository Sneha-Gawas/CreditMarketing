const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();  // To load the .env file

const app = express();
const PORT = process.env.PORT || 5000;
// In Express, for example:
const cors = require('cors');
app.use(cors());

// Load the PDF path from .env
const pdfPath = path.join(__dirname, process.env.PDF_PATH);

app.get("/api/view-pdf", (req, res) => {
  // Check if the PDF file exists in the protected folder
  if (fs.existsSync(pdfPath)) {
    // Set headers to display the PDF inline in the browser
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline"); // Forces inline viewing
    fs.createReadStream(pdfPath).pipe(res); // Streams the PDF to the client
  } else {
    res.status(404).json({ message: "PDF not found" });  // Handle case if the file is not found
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
