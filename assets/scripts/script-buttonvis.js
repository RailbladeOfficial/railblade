//Script to control visiblity of sections and divs based on button clicks.
//This probably needs tidying up.

var previousContentSection = null;

function buttonSectionVisibility(option) {
	var contentDiv = document.getElementById(option);
  
	if (contentDiv) {
		if (contentDiv.style.display === 'none' || contentDiv.style.display === '') {
			if (previousContentSection) {
				previousContentSection.style.display = 'none';
				var previousButton = previousContentSection.previousElementSibling.querySelector('button');
				if (previousButton) {
					previousButton.textContent = '+';
				}
			}

			contentDiv.style.display = 'block';
			var button = contentDiv.previousElementSibling.querySelector('button');
			if (button) {
				button.textContent = '-';
			}

			previousContentSection = contentDiv;
		
			} else {
				contentDiv.style.display = 'none';
				var button = contentDiv.previousElementSibling.querySelector('button');
				if (button) {
					button.textContent = '+';
				}
			}
		} else {
		console.error('Element with ID ' + option + ' not found.');
	}
}

// Check if the initial option is "latest" and expand the section if needed
window.onload = function() {
	var initialOption;
	
	var currentURL = window.location.href;
	
	// Check if the URL contains a specific pattern for "latest" page
	if (currentURL.includes("music.html")) {
		initialOption = "rbmusic";
	} else {
		// Set the default initial option for other pages
		initialOption = "latest"; // Change this to your default option
	}
	
	var initialContentDiv = document.getElementById(initialOption);

	if (initialContentDiv) {
		initialContentDiv.style.display = 'block';
		var initialButton = initialContentDiv.previousElementSibling.querySelector('button');
    if (initialButton) {
		initialButton.textContent = '-';
    }

    previousContentSection = initialContentDiv;
  }
}

var previousContentDiv = null;

function buttonDivVisibility(option) {
	var contentDiv = document.getElementById(option);
  
	if (contentDiv) {
		if (contentDiv.style.display === 'none' || contentDiv.style.display === '') {
			if (previousContentDiv) {
				previousContentDiv.style.display = 'none';
				var previousButton = previousContentDiv.previousElementSibling.querySelector('button');
				if (previousButton) {
					previousButton.textContent = '+';
				}
			}

			contentDiv.style.display = 'block';
			var button = contentDiv.previousElementSibling.querySelector('button');
			if (button) {
				button.textContent = '-';
			}

			previousContentDiv = contentDiv;
		
			} else {
				contentDiv.style.display = 'none';
				var button = contentDiv.previousElementSibling.querySelector('button');
				if (button) {
					button.textContent = '+';
				}
			}
		} else {
		console.error('Element with ID ' + option + ' not found.');
	}
}