const express = require("express");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");



app.use(
  fileUpload({
    limits: {
      fileSize: 5 * 1024 * 1024, //5MB
    },
    abortOnLimit: true,
  })
  );
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

  
  const port = 3000
const start = async () => {
    try {
      //connect DB
       //await connectDB(process.env.MONGO_URI).then(()=> console.log('DB connection successful')); 
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
      
  };
  
  start();
