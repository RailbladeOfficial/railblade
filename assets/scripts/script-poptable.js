//This is a script to populate the Featured Artists table of the Music Page.

// Function to handle the change event of the artist selection dropdown
function handleSelectionChange() {
  var selectElement = document.getElementById("options");
  var selectedValue = selectElement.value;

  if (selectedValue === "selectBlank") {
      console.log("No artist selected.");
      // Clear the table if no artist is selected
      clearTable();
  } else {
      console.log("Artist selected:", selectedValue);
      // Fetch the JSON data for the selected artist
      fetchArtistData(selectedValue);
  }
}

// Function to fetch the JSON data of the selected artist
function fetchArtistData(selectedValue) {
  console.log("Fetching artist data for", selectedValue);
  
  // If no artist is selected, clear the table and return
  if (selectedValue === "blank") {
    console.log("No artist selected.");
    clearTable();
    return;
  }

  // Fetch the URL of the selected artist's JSON data from the index file
  fetch("assets/data/" + selectedValue + ".json") // Assuming each artist's JSON file is named after the artist
      .then(response => response.json())
      .then(artistData => {
          console.log("Artist data fetched successfully.");
          console.log("Artist data:", artistData);
          // Pass the entire artist's JSON data to the displayArtistData function
          displayArtistData(artistData);
      })
      .catch(error => {
          console.error("Error fetching artist data:", error);
      });
}



// Function to display the artist's data
function displayArtistData(artistData) {
  console.log("Displaying artist data:");
  console.log(artistData);

  // Extract the first artist name from the object
  var artistName = Object.keys(artistData)[0];

  // Extract the array of tracks for the artist
  var trackArray = artistData[artistName];

  // Construct the table dynamically based on the available keys in the first track
  var artistInfoTable = "<table><thead><tr>";

  // Extract column headers dynamically from the keys of the first track
  var trackKeys = Object.keys(trackArray[0]);
  trackKeys.forEach(key => {
    artistInfoTable += "<th>" + key + "</th>";
  });

  artistInfoTable += "</tr></thead><tbody>";

  // Iterate over the array of tracks and construct table rows
  trackArray.forEach(track => {
    var trackRow = "<tr>";
    trackKeys.forEach(key => {
      trackRow += "<td>" + (track[key] || "") + "</td>";
    });
    trackRow += "</tr>";
    artistInfoTable += trackRow;
  });

  artistInfoTable += "</tbody></table>";

  var artistInfoParagraph = document.getElementById("artistInfo");
  artistInfoParagraph.innerHTML = artistInfoTable;
}


// Function to clear the table
function clearTable() {
  console.log("Clearing table.");
  var table = document.getElementById("artistInfo");
  table.innerHTML = ""; // Clear table content
}
