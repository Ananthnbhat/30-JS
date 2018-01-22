/*Get all elements*/
const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipBut=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');

function togglePlay(){
    if(video.paused) video.play();
    else video.pause();
}

function updateBut() {
const icon=video.paused ? '►':'❚ ❚';
toggle.textContent=icon;
}

function skip() {
// console.log(this.dataset.skip);
video.currentTime+=parseFloat(this.dataset.skip);
}

function handleRange() {
    video[this.name]=this.value;
// console.log(this.name);
// console.log(this.value);
}

function handleProgress() {
    const percent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`;
}

function scrub(e) {
    // console.log(e);
    const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateBut);
video.addEventListener('pause',updateBut);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);
skipBut.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handleRange));
ranges.forEach(range=>range.addEventListener('mousemove',handleRange));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);