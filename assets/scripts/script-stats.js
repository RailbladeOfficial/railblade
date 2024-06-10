//Script to count the number of artists and songs featured on the site.

// Wait for the DOM content to be fully loaded before executing the function
document.addEventListener('DOMContentLoaded', (event) => {
    // Call the function to generate statistics text
    generateStatsText();
});

// Asynchronous function to generate statistics text
async function generateStatsText() {
    try {
        // Fetch the JSON file containing the list of data files
        const response = await fetch('assets/data/files.json');
        // Extract the list of files from the JSON response
        const files = await response.json();
        // Initialize variables to track total songs and unique artists
        let totalSongs = 0;
        let uniqueArtists = new Set();

        // Iterate over each file in the list
        for (const file of files) {
            try {
                // Fetch the content of each data file
                const response = await fetch(`assets/data/${file}`);
                // Extract JSON data from the fetched content
                const data = await response.json();

                // Iterate over each array of songs in the data
                Object.values(data).forEach(songsArray => {
                    // Iterate over each song object in the array
                    songsArray.forEach(songObject => {
                        // Iterate over each artist in the song object
                        Object.keys(songObject).forEach(artist => {
                            // Check if the song is not empty
                            if (songObject[artist].trim() !== "") {
                                // Increment the total song count
                                totalSongs++;
                                // Add the artist to the set of unique artists
                                uniqueArtists.add(artist);
                            }
                        });
                    });
                });

            } catch (error) {
                // Log an error if fetching or parsing JSON fails for a file
                console.error('Error fetching or parsing JSON:', error, 'File:', file);
            }
        }

        // Calculate the total number of unique artists
        const artistCount = files.length;

        // Get the HTML element where the statistics text will be displayed
        var artistStats = document.getElementById("artistStats");
        // Set the text content to display the generated statistics
        artistStats.textContent = `There are currently ${totalSongs} songs by ${artistCount} unique artists here.`;

    } catch (error) {
        // Log an error if fetching the JSON file list fails
        console.error('Error fetching JSON file list:', error);
    }
}
