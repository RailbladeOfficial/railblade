//This is an indev script to make a radio player.

function playAudio(source) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = source;
    audioPlayer.load();
    audioPlayer.play();
}

document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.volume = 0.25; // Set the initial volume to 50%

    const playlistItems = document.querySelectorAll('#playlist li a');
    let currentIndex = 0;

    function playNextSong() {
        currentIndex = (currentIndex + 1) % playlistItems.length; // Circular playlist
        const source = playlistItems[currentIndex].getAttribute('data-source');
        playAudio(source);
    }

    playlistItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const source = this.getAttribute('data-source');
            playAudio(source);
            currentIndex = Array.from(playlistItems).indexOf(this); // Update the current index
        });
    });

    audioPlayer.addEventListener('ended', function () {
        setTimeout(playNextSong, 3000); // Play the next song after a 3-second delay
    });
});
