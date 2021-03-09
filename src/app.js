const showIP = document.querySelector('#show__ip__address');
  const showLocation = document.querySelector('#show__location');
  const showTimezone = document.querySelector('#show__timezone');
  const showISP = document.querySelector('#show__isp');

  const url = `/.netlify/functions/ip-tracker`;

  getAPIData(url); //We initiate the application (info and map) for the IP of the user

  //We display the info of the IP/Domain the user has searched (or the default values), 
  //and we call getMap function to produce the map that will display the location.
  function getAPIData(url) {
	fetch(url)
  .then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);
		showIP.innerText = data.ip;
		showLocation.innerText =data.location.city + ", " + data.location.country + ", " + data.location.postalCode;
		showTimezone.innerText = data.location.timezone;
		showISP.innerText = data.isp;
    getMap(data.location.lat, data.location.lng);

	}).catch(function(error) {
    console.error('Something went wrong with retrieving the data');
	});
};


//We check the validity of user's input. If data are not valid, we stop the application and alert the user. 
//If they are valid, we call getData to display the info
function getUserInput() {
  let userInput = document.querySelector('#userInput').value;

  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(userInput)){
		//JS Regex to check for valid IP address
		const userURL = `/.netlify/functions/ip-tracker?ipaddress=` + userInput;
    getAPIData(userURL);

	}else if (/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/.test(userInput)) {
		//JS Regex to check for valid domain
    const userURL = `/.netlify/functions/ip-tracker?Domain=` + userInput;
    getAPIData(userURL);

	} else {
		alert("You must enter a valid domain name or IP adress.");
		return;
	}
}


//We set up the map
const mymap = L.map('mapid').setView([30, 0], 3);

//OPENSTREETMAP Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);


// We zoom in to the location and add a marker
function getMap(lat,lng){
	mymap.setView([lat,lng], 12)
	L.marker([lat,lng]).addTo(mymap); //add the marker
}