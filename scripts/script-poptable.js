// script-poptable.js

async function onDropdownSelectionChange() {
  try {
    // Fetch the ArtistIndex JSON file
    const response = await fetch('http://localhost:8080/data/0-ArtistIndex.json');
    const { ArtistIndex } = await response.json();

    // Get the selected artist from the dropdown
    const selectedArtist = document.getElementById('options').value;

    // Get the table ID for the selected artist
    const { tableId, dataUrl } = ArtistIndex[selectedArtist];

    // Fetch the "data" JSON for the selected artist
    const dataResponse = await fetch(tableId);
    const data = await dataResponse.json();

    // Populate the artist's table with data
    populateTable(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// This function populates the table based on the selected artist's data
function populateTable(data) {
  const table = document.getElementById('artistTable');
  table.innerHTML = '';  // Clear existing content

  // Assuming the structure: data.artistData = [{ trackName: trackLink }, ...]
  data.artistData.forEach((item, index) => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.innerHTML = `Track ${index + 1}`;
    cell2.innerHTML = `<a href="${item}">${item}</a>`;
  });
}
