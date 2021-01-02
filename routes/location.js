let express = require("express");
const app=express();
const router=express.Router();
let fetch = require('node-fetch');
let cors= require('cors');

app.use(cors());

let latit=null;
let longit=null;
let obj={};
let anotherObj={};

  router.post('/locations', (request, response)=>{

      let location={}
      location=request.body;

      latit=Number(request.body.lat);
      longit=Number(request.body.long);
   
      fetch('http://nominatim.openstreetmap.org/reverse?format=json&lat=${latit}&lon=${longit}&zoom=18&addressdetails=1', 
      { 
        method:'POST', 
        //mode: 'no-cors',
        headers: 
          {"Content-Type": "application/json"}
         // body: JSON.stringify()
      })
      .then(response => response.json())
      .then(data => {
        console.log(typeof data);
        anotherObj=JSON.stringify(data);
        
       obj.lat = anotherObj.lat;
        obj.long =anotherObj.lon;
        obj.location =anotherObj.address;
       // response.send(obj);
        console.log(obj);
      });
      
  }) 


router.get('/locations', (request, response) =>{
 
 })

module.exports=router;
