
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');
const controlsContainer = document.querySelector('.video-container .controls-container');

const playPauseButton = document.querySelector('.video-container .controls button.play-pause');
const rewindButton = document.querySelector('.video-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls button.volume');
const fullScreenButton = document.querySelector('.video-container .controls button.full-screen');

const playButton = playPauseButton.querySelector('.playing');
const pauseButton = playPauseButton.querySelector('.paused');


const maxVolumeButton = volumeButton.querySelector('.full-volume')
//  
const mutedButton = volumeButton.querySelector('.muted')


const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');

const progressBar = document.querySelector('.video-container .controls-container .progress-bar');
const watchedBar = document.querySelector('.video-container .controls-container .progress-bar .watched-bar');
const timeLeft = document.querySelector('.video-container .controls-container .time-remaining')


let controlsTimeout;
controlsContainer.style.opacity = '0';
watchedBar.style.width = '0px';
pauseButton.style.display = 'none';
minimizeButton.style.display = 'none';


const displayControls = () => {
    controlsContainer.style.opacity = '1';
    document.body.style.cursor = 'initial';
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
    }
    controlsTimeout = setTimeout(() => {
    controlsContainer.style.opacity = '0';
    document.body.style.cursor = 'none';
  }, 3500);
};

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
        maxVolumeButton.style.display = 'none';
        // medVolumeButton.style.display = 'none';
        // lowVolumeButton.style.display = 'none';
        mutedButton.style.display = '';
    } else {
        maxVolumeButton.style.display = '';
        // medVolumeButton.style.display = 'none';
        // lowVolumeButton.style.display = 'none';
        mutedButton.style.display = 'none';
    }   
};

const toggleVolume = () => {

}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const forwardFunction = () => {
    video.currentTime += 5;
};

const backwardFunction = () => {
    video.currentTime -= 5;
};

const fastForwardFunction = () => {
    video.currentTime += 10;
};

const fastBackwardFunction = () => {
    video.currentTime -= 10;
};

const upVolume = () => {
    video.volume += 0.1;
};

const downVolume = () => {
    video.volume -= 0.1;
};

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        maximizeButton.style.display = '';
        minimizeButton.style.display = 'none';
    } else {
        maximizeButton.style.display = 'none';
        minimizeButton.style.display = '';
    }
});

document.addEventListener('keyup', (event) => {
    if(event.code === 'Space' || event.code === 'KeyK') {
        playPause();
    }

    if(event.code === 'KeyM') {
        toggleMute();
    }

    if(event.code === 'KeyF') {
        toggleFullScreen();
    }

    if(event.code === 'ArrowRight') {
        forwardFunction();
    }

    if(event.code === 'ArrowLeft') {
        backwardFunction();
    }

    if(event.code === 'KeyL') {
        fastForwardFunction();
    }

    if(event.code === 'KeyJ') {
        fastBackwardFunction();
    }

    if(event.code === 'ArrowUp') {
        upVolume();
    }

    if(event.code === 'ArrowDown') {
        downVolume();
    }

    displayControls();
});

document.addEventListener('mousemove', () => {
    displayControls();
})

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

rewindButton.addEventListener('click', backwardFunction);

fastForwardButton.addEventListener('click', forwardFunction);

volumeButton.addEventListener('click', toggleMute);

fullScreenButton.addEventListener('click', toggleFullScreen);

// video.addEventListener('click', playPause);