// Script to fetch and paste footer.html to the bottom of other pages.
document.addEventListener("DOMContentLoaded", function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});