const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const pdf = require("pdf-parse");

// initializing the express app
const app = express();

// middleware
app.use(
  fileUpload({
    limits: {
      fileSize: 5 * 1024 * 1024, //5MB
    },
    abortOnLimit: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/upload", async (req, res) => {
  // check if you selected a file
  if (!req.files) return res.send("you must select a file for upload");

  const file = req.files.myFile;
  const splitName = file.name.split(".");
  const extension = splitName[splitName.length - 1];

  // check for the file type
  if (extension != "pdf") {
    res.send("you cannot upload this file type");
  }
 
  const getpdfTotext = async () => {
    let parsedPdfFile;
    let pdfbuffer = file;
    try {
      parsedPdfFile = await pdf(pdfbuffer);
      return parsedPdfFile.text;
    } catch (error) {
      return error.message;
    }
  };
  const result = await getpdfTotext();
  console.log(result.split(" ").length);
  res.status(200);
});

port = 3000;
app.listen(port, () => {
  console.log(`app listen on http://localhost:${port}`);
});
