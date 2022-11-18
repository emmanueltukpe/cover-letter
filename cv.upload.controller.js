
const cvUpload = async (req, res) => {
    // check if you selected a file
    if (!req.files) return res.send("you must select a file for upload");

    const file = req.files.myFile;
    const splitName = file.name.split(".");
    const extension = splitName[splitName.length - 1];

    // check for the file type
    if (extension != "pdf") {
        res.send("you cannot upload this file type");
    }
    res.status(200).send('success');
};

module.exports = { cvUpload }

//console.log(response.data.choices[0].text);




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
