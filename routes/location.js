let express = require("express");
const app=express();
const router=express.Router();
let fetch = require('node-fetch');
let cors= require('cors');
//app.use(cors());
let count=0;
let y=0;
let uniqueObjects=[];

let latit=null;
let longit=null;
let obj={};
let anotherObj={};
let arrayOfObjects=[]; //put all user objects in here
let userInfo={};

  router.post('/locations', (request, response)=>{

      userInfo=request.body;
    //  console.log('this is the body of post to locations',userInfo);

      latit=Number(request.body.lat);
      longit=Number(request.body.long);
   
      fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${latit}&lon=${longit}&zoom=18&addressdetails=1`, 
      { 
        method:'GET', 
        //mode: 'no-cors',
        headers:
        {  "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"} 
         // {"Content-Type": "application/json"}
         // body: JSON.stringify()
      })
      .then(response => {
      //  console.log(response.status);
        return response.json();
      })
      .then(data => {
      //  console.log(typeof data);
       // anotherObj=JSON.parse(data);
        //  console.log('this is the data', data);
        userInfo.lat =data.lat;
        userInfo.long =data.lon;
        userInfo.location =data.address;
         console.log('checking the address', data.address);

        // ****** userinfo has clientId, name, lat and long already, just adding address 
       // userInfo.location=data.address;
        

         // adding objects to Array to send back
        arrayOfObjects.push(userInfo);
           count=arrayOfObjects.length;
           console.log('this is the arrayOfObjects count', count);
           
       // console.log('this is arrayOfObjects',arrayOfObjects);
     
      });
    
           // Somewhat working
             uniqueObjects = [...new Map(arrayOfObjects.map(item => [item.name, item])).values()]
     


     console.log('this is the uniqueObjects count', uniqueObjects.length);
     console.log('these are the objects in uniqueObjects', uniqueObjects);
        
                  
        response.json(uniqueObjects);
  }) 



router.get('/locations', (request, response) =>{

     return response.json(uniqueObjects);

 })


module.exports=router;
