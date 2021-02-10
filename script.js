/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  //console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip); //parseFloat() принимает строку в качестве аргумента и возвращает десятичное число (число с плавающей точкой)
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(`${this.name}`, "=" , `${this.value}`)
  
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay); // клик левой кнопкой мыши
video.addEventListener('play', updateButton); // событие воспроизведение началось
video.addEventListener('pause', updateButton); // -- воспроизведение было приостановлено.
video.addEventListener('timeupdate', handleProgress); // --время, указанное атрибутом currentTime, было обновлено.

toggle.addEventListener('click', togglePlay); 
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); //происходит по окончании изменения значения элемента формы, когда это изменение зафиксировано.
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); //Указывающее устройство перемещается по элементу. (Происходит непрерывно при движении мыши.)

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //Указывающее устройство перемещается по элементу.
progress.addEventListener('mousedown', () => mousedown = true); //На элементе нажимается кнопка указывающего устройства.
progress.addEventListener('mouseup', () => mousedown = false); 