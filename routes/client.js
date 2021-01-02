
let express = require("express");
const router=express.Router();

let lastClientId = 0;

let usersN={
  clientId: null,
  name: null,
  lat:"",
  long:""
};

router.post('/clients', (request, response)=>{
  console.log('Got body:', request.body);
    let theName=request.body;
    lastClientId++;
    console.log(theName.name);

    usersN={
  clientId: lastClientId,
  name:theName.name,
  lat:"",
  long:""
};
   
response.send(usersN.toString());

}) 



router.get('/clients', (request, response) =>{
   response.json(usersN);

})



module.exports=router;
