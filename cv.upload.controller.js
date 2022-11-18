// importing the required modules
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');


// initializing the express app
const app = express();

// middleware
app.use(
    fileUpload({
        createParentPath: true,
        // useTempFiles : true,     //if you want to use temp folder
        // tempFileDir : '/tmp/',   // location of the folder
        limits: {
            fileSize: 5024* 1024 //1MB
        },
        abortOnLimit: true
    })
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/upload', (req, res) => {
    // check if the status of the file
    if  (!req.files) {
        res.status(400).send('Please select a file to be uploaded.');
    } else {
        const file = req.files.myFile;
        console.log(file)
        // file is saved from r=temporary path to a specified path
        const path = __dirname + "/files/" + file.name;

        file.mv(path, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.send({
                status: "success"
            });
        });
    }
    
    

})

port = 3000; 
app.listen(port, () => {
    console.log(`app listen on http://localhost:${port}`)
})