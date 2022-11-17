const express = require("express");
const app = express();
app.get("/", (req, res) => {
	res.send("templates api");
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
