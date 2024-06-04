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