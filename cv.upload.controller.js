const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')

// initializing the express app
const app = express();

// middleware
app.use(
    fileUpload({
        // createParentPath: true,
        // useTempFiles : true,     //if you want to use temp folder
        // tempFileDir : '/tmp/',   // location of the folder
        limits: {
            fileSize: 5 * 1024* 1024 //5MB
        },
        abortOnLimit: true
    })
);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.post('/upload', (req, res) => {
    
    // check if you selected a file
    if (!req.files) return res.send('you must select a file for upload');

    const file = req.files.myFile;
    const splitName = file.name.split('.')
    const extension =  splitName[splitName.length - 1];
    
    // check for the file type
    if (extension != 'pdf') {
        res.send('you cannot upload this file type')
    }
    else{
        const file = req.files.myFile;
        res.status(200).send('Upload Successful');
        console.log(file.data)
    }


})

port = 3000; 
app.listen(port, () => {
    console.log(`app listen on http://localhost:${port}`)
})