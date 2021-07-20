
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

       //fetch('http://localhost:8080/clients', {
        fetch('/clients', {
          method: "POST",
          mode: 'cors',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(nameOfUser)        
         })
         
        $('#prompt').fadeOut(200);

        setInterval(listUsers,1000); 

}
       

//setInterval(function(){ 
function listUsers(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error, options);

      function success(pos) {
      var crd = pos.coords;   
      lati=pos.coords.latitude;
      longi=pos.coords.longitude;
      console.log('this is lati', lati);
      console.log('this is longi', longi);
      } 
 
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 10000
  };
} else{
  alert("Geolocation is not supported by this browser.");
}

  fetch('/clients', {
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
//}, 2000)
    }
 
  function postToLocations(){
    //fetch('http://localhost:8080/locations', {
       fetch('/locations', {
         method: "POST",
         mode: 'cors',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(temObject) 
        })
          
        console.log('checking longitude and latitude', temObject);
  }

  // Working on this to display on webpage users with username,lat,long
  //location
  
   // function displayMessages(){
    setInterval(function(){ 
    let messagesDiv = document.getElementById('messagesForDisplay')
    let displayMsg = '';
  
    fetch('/locations',{
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
                       if(m.name ===  theName){
                        displayMsg += `<div style="color:blue">${m.name}&nbsp IS AT THIS LOCATION:---> ${JSON.stringify(m.location.house_number)}&nbsp ${JSON.stringify(m.location.road)}&nbsp ${JSON.stringify(m.location.city)}&nbsp ${JSON.stringify(m.location.state)}</div><br>`
                       }else{
                        displayMsg += `<div>${m.name}&nbsp IS AT THIS LOCATION:--->${JSON.stringify(m.location.house_number)}&nbsp ${JSON.stringify(m.location.road)}&nbsp ${JSON.stringify(m.location.city)}&nbsp ${JSON.stringify(m.location.state)}</div><br>`

                       }

                    }
              })
  
             var newMessage= displayMsg.replace('<div>Guest&nbsp: Joined</div><br>', ''); 
            
           messagesDiv.innerHTML = newMessage;
          })   
          // console.log('data after GET', data);

  }, 1000)
  
  
  
