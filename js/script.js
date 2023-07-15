console.log("Welcome to here");


// --- responsive nav toggle ----
navBar = document.querySelector('.nav-bar');
navBar.onclick = function(){
    navs =document.querySelector('.navs');
    navs.classList.toggle('open');
};


//Initialize the Variables  
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
// let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Al-Mulk", filePath: "songs/1.mp3", coverPath: "../images/1.jpg" },
    { songName: "Al-Haqq", filePath: "songs/2.mp3", coverPath: "../images/1.jpg" },
    { songName: "Al-Waqiah", filePath: "songs/3.mp3", coverPath: "../images/1.jpg" },
    { songName: "Al-Maidah", filePath: "songs/4.mp3", coverPath: "../images/1.jpg" },
    { songName: "Al-Qiamah", filePath: "songs/5.mp3", coverPath: "../images/1.jpg" },
    { songName: "Al-Mumin", filePath: "songs/6.mp3", coverPath: "../images/1.jpg" },
    { songName: "Surah Al-Ankabut..verse 56-64", filePath: "songs/7.mp3", coverPath: "../images/1.jpg" },
    { songName: "Surah Ad-Dukhan", filePath: "songs/8.mp3", coverPath: "../images/1.jpg" },

]

//Handle play/pause click
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const songItem = Array.from(document.getElementsByClassName('songItem'));

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        masterSongName.style.opacity = 1;
        prevBtn.style.opacity = '100%';
        nextBtn.style.opacity = '100%';
        prevBtn.style.pointerEvents = 'visible';
        nextBtn.style.pointerEvents = 'visible';

        // --- add bg color and songItemPlay button changes ---
        const clickedSongItem = songItem[songIndex];
        const clickedSongItemPlay = clickedSongItem.querySelector('.songItemPlay');

        clickedSongItem.classList.add('bg-songItem');
        clickedSongItemPlay.classList.remove('fa-play-circle');
        clickedSongItemPlay.classList.add('fa-pause-circle');

        songItem.forEach((songItem, index) => {
            if (index !== songIndex) {
                const songItemPlay = songItem.querySelector('.songItemPlay');
                songItemPlay.classList.remove('fa-pause-circle');
                songItemPlay.classList.add('fa-play-circle');
                songItem.classList.remove('bg-songItem');
            }
        });
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        masterSongName.style.opacity = 0;
        prevBtn.style.opacity = '30%';
        nextBtn.style.opacity = '30%';
        prevBtn.style.pointerEvents = 'none';
        nextBtn.style.pointerEvents = 'none';

        // --- remove bg color and songItemPlay button changes ---
        songItem.forEach((songItem) => {
            const songItemPlay = songItem.querySelector('.songItemPlay');
            songItemPlay.classList.remove('fa-pause-circle');
            songItemPlay.classList.add('fa-play-circle');
            songItem.classList.remove('bg-songItem');
        });
    }
});


// --- add bg color and songItemPlay button changes from clicking songname ---
Array.from(document.getElementsByClassName('songName')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedSongItem = e.target.closest('.songItem');
        const songItemPlay = clickedSongItem.querySelector('.songItemPlay');
        const isPlaying = songItemPlay.classList.contains('fa-pause-circle');

        const songItems = Array.from(document.getElementsByClassName('songItem'));
        songItems.forEach((songItem) => {
            if (songItem === clickedSongItem) {
                songItem.classList.add('bg-songItem');
                if (isPlaying) {
                    songItem.classList.remove('bg-songItem');
                }
            } else {
                songItem.classList.remove('bg-songItem');
            }
        });
        if (isPlaying) {
            songItemPlay.classList.remove('fa-pause-circle');
            songItemPlay.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterSongName.style.opacity = 0;
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            prevBtn.style.opacity = '30%';
            nextBtn.style.opacity = '30%';
            prevBtn.style.pointerEvents = 'none';
            nextBtn.style.pointerEvents = 'none';
            return;
        }


        makeAllPlays();
        songIndex = parseInt(songItemPlay.id);
        songItemPlay.classList.remove('fa-play-circle');
        songItemPlay.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        prevBtn.style.opacity = '100%';
        nextBtn.style.opacity = '100%';
        prevBtn.style.pointerEvents = 'visible';
        nextBtn.style.pointerEvents = 'visible';
    });
});


//Listen to Events
audioElement.addEventListener('timeupdate', () => {

    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

//  ---- previous and next button click event ----
document.getElementById('next').addEventListener('click', () => {

    if (songIndex >= 7) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

// --- add bg color and songItemPlay button changes from clicking next btn ---
    const clickedSongItem = songItem[songIndex];
    const clickedSongItemPlay = clickedSongItem.querySelector('.songItemPlay');

    clickedSongItem.classList.add('bg-songItem');
    clickedSongItemPlay.classList.remove('fa-play-circle');
    clickedSongItemPlay.classList.add('fa-pause-circle');

    songItem.forEach((songItem, index) => {
        if (index !== songIndex) {
            const songItemPlay = songItem.querySelector('.songItemPlay');
            songItemPlay.classList.remove('fa-pause-circle');
            songItemPlay.classList.add('fa-play-circle');
            songItem.classList.remove('bg-songItem');
        }
    });
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

// --- add bg color and songItemPlay button changes from clicking previous btn ---
    const clickedSongItem = songItem[songIndex];
    const clickedSongItemPlay = clickedSongItem.querySelector('.songItemPlay');

    clickedSongItem.classList.add('bg-songItem');
    clickedSongItemPlay.classList.remove('fa-play-circle');
    clickedSongItemPlay.classList.add('fa-pause-circle');

    songItem.forEach((songItem, index) => {
        if (index !== songIndex) {
            const songItemPlay = songItem.querySelector('.songItemPlay');
            songItemPlay.classList.remove('fa-pause-circle');
            songItemPlay.classList.add('fa-play-circle');
            songItem.classList.remove('bg-songItem');
        }
    });
})

