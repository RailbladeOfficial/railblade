// script-poptable.js

//Handle change of Artist Dropdown Selector
function handleSelectionChange() {
	selectToggleVisibility();
	onDropdownSelectionChange();
}

var previousOption = null; // Variable to store the previous option

function selectToggleVisibility() {
	var selectedOption = document.getElementById('options').value;

	// Hide the content of the previous option
	if (previousOption) {
		var previousContent = document.getElementById(previousOption);
		if (previousContent) {
			previousContent.style.display = 'none';
		}
	}

	// Show the selected content section
	if (selectedOption) {
		var selectedContent = document.getElementById(selectedOption);
		if (selectedContent) {
			selectedContent.style.display = 'block';
		} else {
			console.error('Content section for the selected option not found.');
		}
	}
	previousOption = selectedOption;
}

async function onDropdownSelectionChange() {
  try {
    // Fetch the ArtistIndex JSON file
    const response = await fetch('assets/data/0-ArtistIndex.json');
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
