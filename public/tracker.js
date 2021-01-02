
let currentId=0;
let clients=[];    // was called obj before

const data = {};
let theName;
let user=theName;
let text="";

let lati=null;
let longi=null;

function renameUser(){

  navigator.geolocation.getCurrentPosition(success, error, options);
     theName= $('#name').val();
   if(theName == null || theName == ''){
      theName="Guest";
   }
   /*
       if(lastClientId!=0){
        if(clients.indexOf(lastClientId) !== -1){
          alert("Value exists");
       } else{  */
     
          let nameOfUser={
            
            name: theName
            };

       fetch('http://localhost:8000/clients', {
       // fetch('/clients', {
          method: "POST",
          mode: 'cors',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(nameOfUser)
         
         })
         
        //  .then(response => response.json())     
         
        
           listUsers();
        }



function listUsers(){
//let messagesDivForUser = document.getElementById('who')
//let displayUser = '';
fetch('http://localhost:8000/clients', {
//  fetch('/users', {
  method: "GET",
  mode: 'cors', 
  headers: {
    'Content-Type': 'application/json',
  },
})
    .then(response => response.json())
    .then(userData=> {
         userData.lat=lati;
         userData.long=longi;
         clients.push(userData);
            currentId=userData.clientId;
        console.log('this is what I got in userData:', userData);
        console.log('this is in clients:', clients);

      }) 

   postToLocations();  
}




 // navigator.geolocation.getCurrentPosition(success, error, options);

  function success(pos) {
    var crd = pos.coords;
      
    lati=crd.latitude;
    longi=crd.longitude;


  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };



  function postToLocations(){

      let tempObj={};
       tempObj=clients[currentId-1];
    //  tempObj.clientId=clients[currentId-1].clientId;
     // tempObj.lat=clients[currentId-1].lat;
     // tempObj.long=clients[currentId-1].long;

    fetch('http://localhost:8000/locations', {
      // fetch('/clients', {
         method: "POST",
         mode: 'cors',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(tempObj)
        
        })

       

  }


  
