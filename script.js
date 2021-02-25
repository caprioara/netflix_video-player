
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const playPauseButton = document.querySelector('.video-container .controls button.play-pause');
const rewindButton = document.querySelector('.video-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls button.volume');
const fullScreenButton = document.querySelector('.video-container .controls button.full-screen');

const playButton = playPauseButton.querySelector('.playing');
const pauseButton = playPauseButton.querySelector('.paused');
const fullVolumeButton = volumeButton.querySelector('.full-volume')
const mutedButton = volumeButton.querySelector('.muted')
const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');

const progressBar = document.querySelector('.video-container .controls-container .progress-bar');
const watchedBar = document.querySelector('.video-container .controls-container .progress-bar .watched-bar');
const timeLeft = document.querySelector('.video-container .controls-container .time-remaining')

watchedBar.style.width = '0px';
pauseButton.style.display = 'none';
minimizeButton.style.display = 'none';

const playPause = () => {
    if(video.paused) {
        video.play();
        playButton.style.display = 'none';
        pauseButton.style.display = '';
    } else {
        video.pause();
        playButton.style.display = '';
        pauseButton.style.display = 'none';
    }
}

const toggleMute = () => {
    video.muted = !video.muted;
    if (video.muted) {
        fullVolumeButton.style.display = 'none';
        mutedButton.style.display = '';
    } else {
        fullVolumeButton.style.display = '';
        mutedButton.style.display = 'none';
    }
    
}

document.addEventListener('keydown', (event) => {
    if(event.code === 'Space') {
        playPause();
    }

    if(event.code === 'KeyM') {
        toggleMute();
    }
});

function timeDigit(time){
    return time < 10 ? '0' + time : time;
};

video.addEventListener('timeupdate', () => {
    watchedBar.style.width = ((video.currentTime / video.duration) * 100) + '%';
    const totalSecondsRemaining = video.duration - video.currentTime;

    const hoursRemaining = Math.floor(totalSecondsRemaining / 3600);
    const minutesRemaining = Math.floor(totalSecondsRemaining % 3600 / 60);
    const secondsRemaining = Math.floor(totalSecondsRemaining % 3600 % 60);

    if (hoursRemaining >= 1) {
        timeLeft.textContent = `${timeDigit(hoursRemaining)}:${timeDigit(minutesRemaining)}:${timeDigit(secondsRemaining)}`;
    } else {
        timeLeft.textContent = `${timeDigit(minutesRemaining)}:${timeDigit(secondsRemaining)}`;
    }

});

progressBar.addEventListener('click', (event) => {
    const pos = (event.pageX  - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
    video.currentTime = pos * video.duration;
});

playPauseButton.addEventListener('click', playPause);

rewindButton.addEventListener('click', () => {
    video.currentTime -= 10;
});

fastForwardButton.addEventListener('click', () => {
    video.currentTime += 10;
});

volumeButton.addEventListener('click', toggleMute);

fullScreenButton.addEventListener('click', () => {
    if(!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        maximizeButton.style.display = 'none';
        minimizeButton.style.display = '';
    } else {
        document.exitFullscreen();
        maximizeButton.style.display = '';
        minimizeButton.style.display = 'none';
    }
});

