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