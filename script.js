// script.js
const playlist = [
    { title: "1. Channa Mereya", src: "channa.mp3" },
    { title: "2. Tere Hawaale   ", src: "Tere_hawaale.mp3" },
    { title: "3. Born To Shine", src: "Born_To_Shine.mp3" }
]

let currentTrack = 0;
let isPlaying = false;
const audio = new Audio();
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeSlider = document.getElementById('volume');
const playlistElement = document.getElementById('playlist');
const searchInput = document.getElementById('search');

// Load playlist
function loadPlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.addEventListener('click', () => loadTrack(index));
        playlistElement.appendChild(li);
    });
}

// Load track
function loadTrack(index) {
    currentTrack = index;
    audio.src = playlist[currentTrack].src;
    playTrack();
}

// Play track
function playTrack() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
}

// Pause track
function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = 'Play';
}

// Toggle play/pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

// Previous track
prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
});

// Next track
nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPlaylist = playlist.filter(track => track.title.toLowerCase().includes(searchTerm));
    playlistElement.innerHTML = '';
    filteredPlaylist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.addEventListener('click', () => loadTrack(index));
        playlistElement.appendChild(li);
    });
});

// Initialize
loadPlaylist();
loadTrack(currentTrack);