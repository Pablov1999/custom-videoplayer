const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-filled');

const toggle = player.querySelector('.toggle');
const sound = player.querySelector('.sound');

const skippButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player-slider');

const slides = ['goddamn.mp4', 'Hang.mp4', 'creek.mp4'];
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

//build our functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method](); 
}

function soundOf() {
    video.muted = !video.muted;
    const soundBtn = document.querySelector('.sound');

    if(video.muted) {
        soundBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;  
    } else {
        soundBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    }
}

function updateButton() {
    const toggleBtn = document.querySelector('.toggle');

    if(this.paused) {
        toggleBtn.innerHTML = `<i class="fas fa-play"></i>`;  
    } else {
        toggleBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    }
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
 
document.onkeydown = function(e) {
    switch ((e || window.event).keyCode) {
      case 32:
        togglePlay();
      break;
      case 75:
        togglePlay();
      break;
      case 77:
        soundOf();
      break;
      case 70:
        toggleFullScreen();   
      break;
    }
}

document.onkeypress = function(e) {
    switch ((e || window.event).code) {
      case 'Comma':
        console.log(video.playbackRate = 0.5);  
      break;
      case 'Period': 
        console.log(video.playbackRate += 0.25);   
      break;
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        player.classList.add('player-fullscreen');
        player-video.classList.add('player-video-fullscreen');
        leftBtn.classList.add('arrow-hidden');
        rightBtn.classList.add('arrow-hidden');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        player.classList.remove('player-fullscreen');
        player-video.classList.remove('player-video-fullscreen');  
        leftBtn.classList.remove('arrow-hidden');
        rightBtn.classList.remove('arrow-hidden');
      }
    }
}

let activeSlide = 0;

rightBtn.addEventListener('click', () => {
  activeSlide++;
  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }
  setActiveSlide();
})

leftBtn.addEventListener('click', () => {
  activeSlide--;
  if (activeSlide < 0) {
    activeSlide = slides.length - 1;
  }
  setActiveSlide();
})

function setActiveSlide() {
  video.src = slides[activeSlide];
}

//hook up the event listners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);

video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
sound.addEventListener('click', soundOf);
skippButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);