// Script to count the number of artists and songs featured on the site.

// Wait for the DOM content to be fully loaded before executing the function
document.addEventListener('DOMContentLoaded', (event) => {
    // Call the function to generate statistics text
    generateStatsText();
});

// Asynchronous function to generate statistics text
async function generateStatsText() {
    try {
        // Fetch the JSON files containing the list of data files
        const [singlesResponse, albumsResponse] = await Promise.all([
            fetch('assets/data/statsFiles/filesForSinglesStats.json'),
            fetch('assets/data/statsFiles/filesForAlbumsStats.json')
        ]);

        // Extract the list of files from the JSON responses
        const singlesFiles = await singlesResponse.json();
        const albumsFiles = await albumsResponse.json();

        // Initialize variable to track total songs
        let totalSongs = 0;

        // Helper function to process singles data files
        async function processSinglesData(file) {
            try {
                const response = await fetch(`assets/data/singlesData/${file}`);
                const data = await response.json();

                Object.values(data).forEach(songsArray => {
                    songsArray.forEach(songObject => {
                        Object.keys(songObject).forEach(artist => {
                            if (songObject[artist].trim() !== "") {
                                totalSongs++;
                            }
                        });
                    });
                });
            } catch (error) {
                console.error('Error fetching or parsing JSON:', error, 'File:', file);
            }
        }

        // Helper function to process albums data files
        async function processAlbumsData(file) {
            try {
                const response = await fetch(`assets/data/albumsData/${file}`);
                const data = await response.json();

                data.albums.forEach(album => {
                    album.tracks.forEach(track => {
                        if (track.song.trim() !== "") {
                            totalSongs++;
                        }
                    });
                });
            } catch (error) {
                console.error('Error fetching or parsing JSON:', error, 'File:', file);
            }
        }

        // Process all singles data files
        await Promise.all(singlesFiles.map(file => processSinglesData(file)));

        // Process all albums data files
        await Promise.all(albumsFiles.map(file => processAlbumsData(file)));

        // Calculate the total number of unique artists (files in the singlesFiles list)
        const artistCount = singlesFiles.length;

        // Get the HTML element where the statistics text will be displayed
        var artistStats = document.getElementById("artistStats");
        // Set the text content to display the generated statistics
        artistStats.textContent = `There are currently ${totalSongs} songs by ${artistCount} unique artists here.`;

    } catch (error) {
        console.error('Error fetching JSON file list:', error);
    }
}
