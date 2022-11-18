
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