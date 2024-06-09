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
      // Fetch the URL of the selected artist's JSON data from the index file
      fetchArtistData(selectedValue);
  }
}

// Function to fetch the JSON data of the selected artist
function fetchArtistData(selectedValue) {
  console.log("Fetching artist data for", selectedValue);
  // Fetch the URL of the selected artist's JSON data from the index file
  fetch("assets/data/0-ArtistIndex.json") // Ensure correct path to the index file
      .then(response => response.json())
      .then(data => {
          console.log("Artist index data:", data);

          // Retrieve the data URL of the selected artist
          var artistIndex = data["ArtistIndex"][0];
          console.log("Artist index:", artistIndex);

          var dataUrl = artistIndex[selectedValue]["dataUrl"];
          console.log("Data URL:", dataUrl);

          // Fetch the artist's JSON data
          fetch(dataUrl)
              .then(response => response.json())
              .then(artistData => {
                  console.log("Artist data fetched successfully.");
                  console.log("Artist data:", artistData);
                  // Display the artist's data in a table
                  displayArtistData(artistData[selectedValue]);
              })
              .catch(error => {
                  console.error("Error fetching artist data:", error);
              });
      })
      .catch(error => {
          console.error("Error fetching artist index data:", error);
      });
}


// Function to display the artist's data in a table
function displayArtistData(artistName, artistData) {
  console.log("Displaying artist data in table for artist:", artistName);
  console.log("Artist data:", artistData);

  var table = document.getElementById("artistInfo");
  table.innerHTML = ""; // Clear previous content
  console.log("Cleared previous table content.");

  // Check if artistData is undefined or empty
  if (!artistData || !artistData[artistName] || artistData[artistName].length === 0) {
      console.log("No data found for the selected artist:", artistName);
      return;
  }

  // Determine if the artist data has two columns or one
  var isTwoColumn = Object.keys(artistData[artistName][0]).length > 1;
  console.log("Is two column:", isTwoColumn);

  // Add table headers
  var headerRow = table.insertRow();
  console.log("Inserted header row.");
  if (isTwoColumn) {
      var headerCell1 = headerRow.insertCell(0);
      var headerCell2 = headerRow.insertCell(1);
      headerCell1.innerHTML = "ezmuze+ Hamst3r Edition";
      headerCell2.innerHTML = "ezmuze+ 2.0";
      console.log("Inserted two column headers.");
  } else {
      var headerCell = headerRow.insertCell(0);
      headerCell.innerHTML = "Tracks";
      console.log("Inserted one column header.");
  }

  // Add table data
  artistData[artistName].forEach(track => {
      var row = table.insertRow();
      console.log("Inserted new row.");
      if (isTwoColumn) {
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = track["ezmuze+ Hamst3r Edition"] || ""; // Handle undefined values
          cell2.innerHTML = track["ezmuze+ 2.0"] || ""; // Handle undefined values
          console.log("Inserted two column data.");
      } else {
          var cell = row.insertCell(0);
          cell.innerHTML = track || ""; // Handle undefined values
          console.log("Inserted one column data.");
      }
  });
}



// Function to clear the table
function clearTable() {
  console.log("Clearing table.");
  var table = document.getElementById("artistInfo");
  table.innerHTML = ""; // Clear table content
}
