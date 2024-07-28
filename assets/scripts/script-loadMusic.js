var debug = false;

document.addEventListener("DOMContentLoaded", function () {
  fetchRailbladeData();
});

// Function to handle the change event of the artist selection dropdown
function handleSelectionChange() {
  var selectElement = document.getElementById("options");
  var selectedValue = selectElement.value;

  if (selectedValue === "blank") {
    if (debug) console.log("No artist selected.");
    // Clear the content if no artist is selected
    clearContent();
  } else {
    if (debug) console.log("Artist selected:", selectedValue);
    // Clear the previous content before fetching new data
    clearContent();

    // Fetch the JSON data for the selected artist
    Promise.all([
      fetchArtistSingles(selectedValue),
      fetchArtistLinks(selectedValue),
      fetchArtistAlbums(selectedValue)
    ]).then(() => {
      if (debug) console.log("All data fetched successfully.");
    }).catch(error => {
      console.error("Error fetching artist data:", error);
    });
  }

  // Function to fetch the JSON data of the selected artist
  function fetchArtistSingles(selectedValue) {
    if (debug) console.log("Fetching artist data for", selectedValue);

    if (selectedValue === "blank") {
      if (debug) console.log("No artist selected.");
      return Promise.resolve(); // No data to fetch
    }

    return fetch("assets/data/singlesData/" + selectedValue + ".json")
      .then(response => response.json())
      .then(artistData => {
        if (debug) console.log("Artist data fetched successfully.");
        if (debug) console.log("Artist data:", artistData);
        displayArtistSingles(artistData, "artistInfoSingles");
      })
      .catch(error => {
        console.error("Error fetching artist data:", error);
      });
  }

  // Function to fetch the artist links data
  function fetchArtistLinks(selectedValue) {
    if (debug) console.log("Fetching artist links for", selectedValue);

    return fetch("assets/data/linksData/" + selectedValue + "-links.json")
      .then(response => response.json())
      .then(linksData => {
        if (debug) console.log("Artist links data fetched successfully.");
        if (debug) console.log("Artist links data:", linksData);
        displayArtistLinks(linksData);
      })
      .catch(error => {
        console.error("Error fetching artist links data:", error);
        if (debug) console.log("No links data found for the selected artist.");
      });
  }

  // Function to fetch and display artist's albums
  function fetchArtistAlbums(selectedValue) {
    if (debug) console.log("Fetching artist albums for", selectedValue);

    return fetch("assets/data/albumsData/" + selectedValue + "-albums.json")
      .then(response => response.json())
      .then(albumData => {
        if (debug) console.log("Artist albums data fetched successfully.");
        if (debug) console.log("Artist albums data:", albumData);
        displayArtistAlbums(albumData);
      })
      .catch(error => {
        clearAlbums(); // Ensure albums section is cleared
      });
  }
}

// Function to display the artist's links data
function displayArtistLinks(linksData) {
  if (debug) console.log("Displaying artist links data:");
  if (debug) console.log(linksData);

  var artistName = Object.keys(linksData)[0];
  var linksArray = linksData[artistName];
  var artistLinks = "";
  linksArray.forEach(link => {
    var key = Object.keys(link)[0];
    var value = link[key];
    artistLinks += value + "<br>";
  });

  var artistInfoParagraph = document.getElementById("artistInfoLinks");
  artistInfoParagraph.innerHTML = artistLinks + "<br>" + artistInfoParagraph.innerHTML;
}

// Function to display the artist's data
function displayArtistSingles(artistData, targetDiv) {
  if (debug) console.log("Displaying artist data:");
  if (debug) console.log(artistData);

  var artistName = Object.keys(artistData)[0];
  var trackArray = artistData[artistName];
  var artistInfoTable = "<table><thead><tr>";

  var trackKeys = Object.keys(trackArray[0]);
  trackKeys.forEach(key => {
    artistInfoTable += "<th>" + key + "</th>";
  });

  artistInfoTable += "</tr></thead><tbody>";

  trackArray.forEach(track => {
    var trackRow = "<tr>";
    trackKeys.forEach(key => {
      trackRow += "<td>" + (track[key] || "") + "</td>";
    });
    trackRow += "</tr>";
    artistInfoTable += trackRow;
  });

  artistInfoTable += "</tbody></table>";

  var artistInfoParagraph = document.getElementById(targetDiv);
  artistInfoParagraph.innerHTML = artistInfoParagraph.innerHTML + artistInfoTable;
}

// Function to display the artist's albums data
function displayArtistAlbums(albumData) {
  if (debug) console.log("Displaying artist albums data:");
  if (debug) console.log(albumData);

  var artistName = albumData.artist;
  var albums = albumData.albums;
  var albumsHtml = "";

  albums.forEach(album => {
    albumsHtml += generateAlbumHTML(album,true);
  });

  var artistInfoParagraph = document.getElementById("artistInfoAlbums");
  artistInfoParagraph.innerHTML = albumsHtml + artistInfoParagraph.innerHTML;
  if (debug) console.log(albumsHtml);
  if (debug) console.log(artistInfoParagraph.innerHTML);
}

function generateAlbumHTML(album,showTitle) {
  var albumTitle = album.albumTitle;
    var releaseYear = album.releaseYear;
    var albumArt = album.albumArt;
    var tracks = album.tracks;

    albumsHtml = "";
    if (showTitle == true) {
      albumsHtml = "<h3>" + albumTitle + " (" + releaseYear + ")" + "</h3>";
    }
    if (albumArt) {
      albumsHtml += "<div class='album-container'>" +
        "<div class='album-art-container'>" +
        "<img src='" + albumArt + "' alt='" + albumTitle + "' class='album-art'>" +
        "</div>" +
        "<div class='album-tracks'>" +
        "<table><thead><tr><th>Track Number</th><th>Song</th></tr></thead><tbody>";

      tracks.forEach(track => {
        albumsHtml += "<tr><td>" + track.trackNumber + "</td><td>" + track.song + "</td></tr>";
      });

      albumsHtml += "</tbody></table></div></div>";
    }
    return albumsHtml;
}

// Function to clear the content (links, albums, and singles)
function clearContent() {
  if (debug) console.log("Clearing content.");
  document.getElementById("artistInfoAlbums").innerHTML = "";
  document.getElementById("artistInfoLinks").innerHTML = "";
  document.getElementById("artistInfoSingles").innerHTML = "";
}

// Function to clear albums section (optional, for completeness)
function clearAlbums() {
  if (debug) console.log("Clearing albums.");
  var artistInfoParagraph = document.getElementById("artistInfoAlbums");
  var albumContainers = artistInfoParagraph.getElementsByClassName('album-container');
  while (albumContainers.length > 0) {
    albumContainers[0].remove();
  }
}

async function fetchRailbladeData() {
  if (debug) console.log("I GOT HERE");
  const divs = rbmusic.querySelectorAll('.collapseddiv');

  for (const div of divs) {
    const id = div.querySelector('button').getAttribute('onclick').match(/'(.*?)'/)[1];
    const contentDiv = div.querySelector('.expandeddiv');
    const paragraph = contentDiv.querySelector('p');
    const title = div.querySelector('span');

    if (id === 'other') {
      // Fetch singles data

      if (debug) console.log("Found Other");
      try {
        const response = await fetch('assets/data/singlesData/Railblade.json');
        const data = await response.json();

        if (debug) console.log(data);
        document.getElementById("other").innerHTML = "";
        displayArtistSingles(data, "other");
      } catch (error) {
        paragraph.innerHTML = "Error fetching singles data.";
      }
    } else {
      // Fetch album data
      try {
        const response = await fetch('assets/data/albumsData/Railblade-albums.json');
        const data = await response.json();
        const album = data.albums.find(album => album.divID === id);
        if (album) {
          if (debug) console.log(album);
          paragraph.innerHTML = generateAlbumHTML(album,false);
          // title.innerHTML = "<img src='" + album.albumArt + "' width=120>&nbsp;" + title.innerHTML;
        } else {
          paragraph.innerHTML = "Album not found.";
        }
      } catch (error) {
        paragraph.innerHTML = "Error fetching album data.";
      }
    }
  }
}