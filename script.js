var Airtable = require("airtable");

var base = new Airtable({ apiKey: "keyHlW6YblyFsAAJ0" }).base(
  "appH5RGtmpqqGwXh8"
);

base("Crime")
  .select({})
  .eachPage(gotPageOfCrimes, gotAllCrimes);

const crimes = [];

function gotPageOfCrimes(records, fetchNextPage) {
  console.log("gotPageOfCrimes()");
  crimes.push(...records);
  fetchNextPage();
}

function gotAllCrimes(err) {
  console.log("gotAllCrimes()");

  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  consoleLogCrimes();
  try {
    showCrimes();
  } catch (e) {
    console.log(e);
  }

  function consoleLogCrimes() {
    console.log("consoleLogCrimes()");
    crimes.forEach(crime => {
      console.log("Crime:", crime);
    });
  }

  var crimeContainer = document.createElement("div");
  crimeContainer.classList.add("crime-container");
  document.querySelector(".container").append
  (crimeContainer);
  
  function showCrimes() {
    console.log("showCrimes()");
    crimes.forEach(crime => {
      
      var crimeContainer = document.createElement("div");
      crimeContainer.classList.add("crime-container");
      document.querySelector(".container").append(crimeContainer);

      var crimeName = document.createElement("h2");
      
      crimeName.innerText = crime.fields.name;
      document.body.append(crimeName);

      var crimeKnownAs = document.createElement("h3");
      crimeKnownAs.innerText = crime.fields.known_as;
      document.body.append(crimeKnownAs);

      var crimePhoto = document.createElement("img");
      crimePhoto.classList.add("crime-photo");
      crimePhoto.src = crime.fields.Photo[0].url;
      document.body.append(crimePhoto);
    });
  }
}
