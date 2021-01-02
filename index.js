let express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.static("./public"));

let clientRoutes=require("./routes/client.js");
let locationRoutes=require("./routes/location.js");

app.use(clientRoutes);
app.use(locationRoutes);
 

const thePort = 8000;
app.listen(thePort, (err) => {
 if (err) {
   return console.log("Error", err);
 }
 console.log("Web server is now listening for messages on port",thePort);

});


/*
let port = 8080;
 if (port == null || port == "") {
  port = 3000;
}  
app.listen(port);

*/
