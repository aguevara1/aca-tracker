
let currentId=0;
let clients=[];   
let temObject={}; 

const data = {};
let theName;
let user=theName;
let text="";
let compareObjects=[];

let lati=null;
let longi=null;

function renameUser(){

     theName= $('#name').val();
   if(theName == null || theName == ''){
      theName="Guest";
   }

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
         
        $('#prompt').fadeOut(200);
}
       

setInterval(function(){ 
//function listUsers(){

  navigator.geolocation.getCurrentPosition(success, error, options);
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
         temObject=JSON.parse(JSON.stringify(userData));

            currentId=userData.clientId;
        console.log('This is the currentId',currentId);
        
        //userData has all the right information
        console.log('this is what I got in userData:', userData);

        console.log('This is the temObject',temObject);

        //clients array also has right information
        console.log('this is in clients:', clients);
      }) 

   postToLocations();  
}, 1000)

 
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
      
      //clients doesn't have clientId or name, they are null, this part not working
       tempObj=clients[currentId];
     //  console.log('before doing post to locations', clients[currentId+5]);
       

    fetch('http://localhost:8000/locations', {
      // fetch('/clients', {
         method: "POST",
         mode: 'cors',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(temObject) 
        })
            // displayMessages();
  }

  // Working on this to display on webpage users with username,lat,long
  //location
  
   // function displayMessages(){
    setInterval(function(){ 
    let messagesDiv = document.getElementById('messagesForDisplay')
    let displayMsg = '';
   // fetch('http://localhost:8080/messages')
    fetch('http://localhost:8000/locations',{
    method: "GET",
    mode: 'cors', 
    headers: {
      'Content-Type': 'application/json',
    },
  })  

        .then(response => response.json())
        //need to loop through m and just display the ones that are different
        .then(data => { 
           console.log('data after GET', data);
             data.map(m => {
                  if(m.name){
                  //  compareObjects.push(m);


              //  var my_obj_str = JSON.stringify(m.location});
                // if(JSON.stringify(m.location))
                  displayMsg += `<div>${m.name}&nbsp: ${JSON.stringify(m.location)}</div><br>`
                     
                }
              })
  
             var newMessage= displayMsg.replace('<div>Guest&nbsp: Joined</div><br>', ''); 
            
           messagesDiv.innerHTML = newMessage;
          })   
          // console.log('data after GET', data);

  }, 1000)
  
  
  
