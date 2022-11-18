const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const pdf = require("pdf-parse");
require('dotenv').config();
// const cloudinary = require("cloudinary").v2;
const { Configuration, OpenAIApi } = require("openai");

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
//   console.log(result);
  res.status(200);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Generate a cover letter for a backend web developer at Google, the resume is as follows: ${result}`,
    temperature: 0.7,
    max_tokens: 424,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

console.log(response.data.choices[0].text);




//   cloudinary.uploader
//     .upload(result, {
//       resource_type: "auto",
//     })
//     .then((result) => {
//       // console.log("success", JSON.stringify(result, null, 2));
//       console.log(JSON.stringify(result.url));
//     })
//     .catch((error) => {
//       console.log("error", JSON.stringify(error, null, 2));
//     });

});



port = 3000
app.listen(port, () => {
  console.log(`app listen on http://localhost:${port}`);
});
